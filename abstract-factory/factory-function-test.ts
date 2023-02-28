import { createLogger } from "./factory-function";

const logger = createLogger();

//default is Development environment
logger.debug("debug message"); //prints
logger.warn("warn message"); //prints
logger.info("info message"); //prints
logger.error("error message"); //prints

// set NODE_ENV=production
logger.debug("debug message"); //none
logger.warn("warn message"); //prints
logger.info("info message"); //none
logger.error("error message"); //prints

//npx ts-node factory-class-tests
