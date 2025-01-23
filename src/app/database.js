// src/database.js
const { PrismaClient } = require('@prisma/client');
const logger = require ('./logging')

const prismaClient = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'], 
});

prismaClient.$on('query', (e) => {
  logger.info({
    event: 'query',
    query: e.query,
    params: e.params,
    duration: `${e.duration}ms`,
  });
});

prismaClient.$on('info', (e) => {
  logger.info({
    event: 'info',
    message: e.message,
  });
});

prismaClient.$on('warn', (e) => {
  logger.warn({
    event: 'warn',
    message: e.message,
  });
});

prismaClient.$on('error', (e) => {
  logger.error({
    event: 'error',
    message: e.message,
  });
});

module.exports = { prismaClient };
