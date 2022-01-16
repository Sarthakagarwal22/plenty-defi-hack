# Fungible Assets - FA12
# Inspired by https://gitlab.com/tzip/tzip/blob/master/A/FA1.2.md
import smartpy as sp


# The metadata below is just an example, it serves as a base,
# the contents are used to build the metadata JSON that users
# can copy and upload to IPFS.
TZIP16_Metadata_Base = {
    "name"          : "SmartPy FA1.2 Token Template",
    "description"   : "Template for an FA1.2 Contract from SmartPy",
    "authors"       : [
        "SmartPy Dev Team <email@domain.com>"
    ],
    "homepage"      : "https://smartpy.io",
    "interfaces"    : [
        "TZIP-007-2021-04-17",
        "TZIP-016-2021-04-17"
    ],
}


class FA12_Error:
    def make(s): return ("FA1.2_" + s)

    NotAdmin                        = make("NotAdmin")
    InsufficientBalance             = make("InsufficientBalance")
    UnsafeAllowanceChange           = make("UnsafeAllowanceChange")
    Paused                          = make("Paused")
    NotAllowed                      = make("NotAllowed")


class FA12_config:
    def __init__(
        self,
        support_upgradable_metadata         = False,
        use_token_metadata_offchain_view    = False,
    ):
        self.support_upgradable_metadata = support_upgradable_metadata
        self.use_token_metadata_offchain_view = use_token_metadata_offchain_view


class FA12_common:
    # Helper function to build metadata JSON (string => bytes).
    def normalize_metadata(self, metadata):
        for key in metadata:
            metadata[key] = sp.utils.bytes_of_string(metadata[key])

        return metadata


class FA12_core(sp.Contract, FA12_common):
    def __init__(self, config, **extra_storage):
        self.config = config

        self.init(
            balances = sp.big_map(tvalue = sp.TRecord(approvals = sp.TMap(sp.TAddress, sp.TNat), balance = sp.TNat)),
            totalSupply = 0,
            **extra_storage
        )

    @sp.entry_point
    def transfer(self, params):
        sp.set_type(params, sp.TRecord(from_ = sp.TAddress, to_ = sp.TAddress, value = sp.TNat).layout(("from_ as from", ("to_ as to", "value"))))
        sp.verify(self.is_administrator(sp.sender) |
            (~self.is_paused() &
                ((params.from_ == sp.sender) |
                 (self.data.balances[params.from_].approvals[sp.sender] >= params.value))), FA12_Error.NotAllowed)
        self.addAddressIfNecessary(params.from_)
        self.addAddressIfNecessary(params.to_)
        sp.verify(self.data.balances[params.from_].balance >= params.value, FA12_Error.InsufficientBalance)
        self.data.balances[params.from_].balance = sp.as_nat(self.data.balances[params.from_].balance - params.value)
        self.data.balances[params.to_].balance += params.value
        sp.if (params.from_ != sp.sender) & (~self.is_administrator(sp.sender)):
            self.data.balances[params.from_].approvals[sp.sender] = sp.as_nat(self.data.balances[params.from_].approvals[sp.sender] - params.value)

    @sp.entry_point
    def approve(self, params):
        sp.set_type(params, sp.TRecord(spender = sp.TAddress, value = sp.TNat).layout(("spender", "value")))
        self.addAddressIfNecessary(sp.sender)
        sp.verify(~self.is_paused(), FA12_Error.Paused)
        alreadyApproved = self.data.balances[sp.sender].approvals.get(params.spender, 0)
        sp.verify((alreadyApproved == 0) | (params.value == 0), FA12_Error.UnsafeAllowanceChange)
        self.data.balances[sp.sender].approvals[params.spender] = params.value

    def addAddressIfNecessary(self, address):
        sp.if ~ self.data.balances.contains(address):
            self.data.balances[address] = sp.record(balance = 0, approvals = {})

    @sp.utils.view(sp.TNat)
    def getBalance(self, params):
        sp.if self.data.balances.contains(params):
            sp.result(self.data.balances[params].balance)
        sp.else:
            sp.result(sp.nat(0))

    @sp.utils.view(sp.TNat)
    def getAllowance(self, params):
        sp.if self.data.balances.contains(params.owner):
            sp.result(self.data.balances[params.owner].approvals.get(params.spender, 0))
        sp.else:
            sp.result(sp.nat(0))

    @sp.utils.view(sp.TNat)
    def getTotalSupply(self, params):
        sp.set_type(params, sp.TUnit)
        sp.result(self.data.totalSupply)


class FA12_mint_burn(FA12_core):
    @sp.entry_point
    def mint(self, params):
        sp.set_type(params, sp.TRecord(address = sp.TAddress, value = sp.TNat))
        sp.verify(self.is_administrator(sp.sender), FA12_Error.NotAdmin)
        self.addAddressIfNecessary(params.address)
        self.data.balances[params.address].balance += params.value
        self.data.totalSupply += params.value

    @sp.entry_point
    def burn(self, params):
        sp.set_type(params, sp.TRecord(address = sp.TAddress, value = sp.TNat))
        sp.verify(self.is_administrator(sp.sender), FA12_Error.NotAdmin)
        sp.verify(self.data.balances[params.address].balance >= params.value, FA12_Error.InsufficientBalance)
        self.data.balances[params.address].balance = sp.as_nat(self.data.balances[params.address].balance - params.value)
        self.data.totalSupply = sp.as_nat(self.data.totalSupply - params.value)


class FA12_administrator(FA12_core):
    def is_administrator(self, sender):
        return sender == self.data.administrator

    @sp.entry_point
    def setAdministrator(self, params):
        sp.set_type(params, sp.TAddress)
        sp.verify(self.is_administrator(sp.sender), FA12_Error.NotAdmin)
        self.data.administrator = params

    @sp.utils.view(sp.TAddress)
    def getAdministrator(self, params):
        sp.set_type(params, sp.TUnit)
        sp.result(self.data.administrator)


class FA12_pause(FA12_core):
    def is_paused(self):
        return self.data.paused

    @sp.entry_point
    def setPause(self, params):
        sp.set_type(params, sp.TBool)
        sp.verify(self.is_administrator(sp.sender), FA12_Error.NotAdmin)
        self.data.paused = params


class FA12_token_metadata(FA12_core):
    """
        SPEC: https://gitlab.com/tzip/tzip/-/blob/master/proposals/tzip-12/tzip-12.md#token-metadata

        Token-specific metadata is stored/presented as a Michelson value of type (map string bytes).

        A few of the keys are reserved and predefined:

        >>    ""          : Should correspond to a TZIP-016 URI which points to a JSON representation of the token
                            metadata.

        >>    "name"      : Should be a UTF-8 string giving a “display name” to the token.

        >>    "symbol"    : Should be a UTF-8 string for the short identifier of the token (e.g. XTZ, EUR, …).

        >>    "decimals"  : Should be an integer (converted to a UTF-8 string in decimal) which defines the position of                   the decimal point in token balances for displaypurposes.
    """
    def set_token_metadata(self, metadata):
        """
            Store the token_metadata values in a big-map annotated %token_metadata
            of type (big_map nat (pair (nat %token_id) (map %token_info string bytes))).
        """
        self.update_initial_storage(
            token_metadata = sp.big_map(
                {
                    0: sp.record(token_id = 0, token_info = self.normalize_metadata(metadata))
                },
                tkey = sp.TNat,
                tvalue = sp.TRecord(token_id = sp.TNat, token_info = sp.TMap(sp.TString, sp.TBytes))
            )
        )


class FA12_contract_metadata(FA12_core):
    """
        SPEC: https://gitlab.com/tzip/tzip/-/blob/master/proposals/tzip-16/tzip-16.md

        This class offers utilities to define and set TZIP-016 contract metadata.
    """
    def generate_tzip16_metadata(self):
        metadata = {
            **TZIP16_Metadata_Base
        }
        self.init_metadata("metadata", metadata)

    def set_contract_metadata(self, metadata):
        self.update_initial_storage(
            metadata = sp.big_map(self.normalize_metadata(metadata))
        )


class FA12(
    FA12_mint_burn,
    FA12_administrator,
    FA12_pause,
    FA12_token_metadata,
    FA12_contract_metadata,
    FA12_core
):
    def __init__(self, admin, config, token_metadata = None, contract_metadata = None):
        FA12_core.__init__(self, config, paused = False, administrator = admin)

        if token_metadata is None and contract_metadata is None:
            raise Exception(
            """\n
                Contract must contain at least of the following:
                    \t- TZIP-016 %metadata big-map,
                    \t- Token-specific-metadata through the %token_metadata big-map

                More info: https://gitlab.com/tzip/tzip/blob/master/proposals/tzip-7/tzip-7.md#token-metadata
            """
            )

        self.usingTokenMetadata = False
        if token_metadata is not None:
            self.usingTokenMetadata = True
            self.set_token_metadata(token_metadata)
        if contract_metadata is not None:
            self.set_contract_metadata(contract_metadata)

        # This is only an helper, it produces metadata in the output panel
        # that users can copy and upload to IPFS.
        self.generate_tzip16_metadata()


if "templates" not in __name__:
    @sp.add_test(name = "FA12")
    def test():

        scenario = sp.test_scenario()
        scenario.h1("FA1.2 template - Fungible assets")

        scenario.table_of_contents()

        # sp.test_account generates ED25519 key-pairs deterministically:
        admin = sp.address('tz1XKnBMk5ewiMJY2j4RaomRPy2ePMCc9jSW')

        scenario.h1("Contract")
        token_metadata = {
            "decimals"    : "18",               # Mandatory by the spec
            "name"        : "Test Wala Token",  # Recommended
            "symbol"      : "TWT",              # Recommended
            # Extra fields
            "icon"        : 'https://i.ibb.co/Xt8dh02/Whats-App-Image-2022-01-11-at-1-55-02-AM.jpg'
        }
        contract_metadata = {
            "" : "ipfs://bafkreibd6h3lwtyjzfh2ts47prtdzmooi54rjgqytnvbil3cuvjg2tkbd4",
        }
        c1 = FA12(
            admin,
            config              = FA12_config(),
            token_metadata      = token_metadata,
            contract_metadata   = contract_metadata
        )
        scenario += c1
