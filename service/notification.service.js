const { prismaClient } = require("../app/database");

const getAllNotificationService = async () => {
    return prismaClient.notification.findMany();
};

const getIdNotificationService = async (notificationId) => {
    return await prismaClient.notification.findUnique({
        where: {id: notificationId}
    })
}

const getAllRecordService = async () => {
    return prismaClient.record.findMany();
};

const getIdRecordService = async (recordId) => {
    return await prismaClient.record.findUnique({
        where: {id: recordId}
    })
}


module.exports = {
    getAllNotificationService,
    getIdNotificationService,
    getAllRecordService,
    getIdRecordService
}