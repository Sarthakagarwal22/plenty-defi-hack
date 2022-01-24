import utilModel from '../models/utils.js';

export const getMetaData = async () => {
    const metaData = await utilModel.findOne({});
    return metaData || {};
}

export const updateMetaData = async (updateObj) => {
    if(!updateObj || Object.keys(updateObj).length === 0){
        throw new Error('Invalid Request');
    }
    const config = await getMetaData();
    let updatedMetaData = {...(config.metaData), ...updateObj};
    await utilModel.findOneAndUpdate({}, {metaData: updatedMetaData}, {upsert: true});
    return {
        status:'OK',
        message: 'MetaData updated successfully'
    };
}