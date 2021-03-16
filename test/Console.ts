import { error, info, log, warn } from '../src/Console'
import { deepStrictEqual } from './util'

describe('Console', () => {
  it('log', () => {
    // tslint:disable-next-line:no-console
    const log_ = console.log
    const logger: Array<any> = []
    // tslint:disable-next-line:no-console
    console.log = (a: any) => {
      logger.push(a)
    }
    log('log')()
    deepStrictEqual(logger, ['log'])
    // tslint:disable-next-line:no-console
    console.log = log_
  })

  it('info', () => {
    // tslint:disable-next-line:no-console
    const info_ = console.info
    const logger: Array<any> = []
    // tslint:disable-next-line:no-console
    console.info = (a: any) => {
      logger.push(a)
    }
    info('info')()
    deepStrictEqual(logger, ['info'])
    // tslint:disable-next-line:no-console
    console.info = info_
  })

  it('error', () => {
    // tslint:disable-next-line:no-console
    const error_ = console.error
    const logger: Array<any> = []
    // tslint:disable-next-line:no-console
    console.error = (a: any) => {
      logger.push(a)
    }
    error('error')()
    deepStrictEqual(logger, ['error'])
    // tslint:disable-next-line:no-console
    console.error = error_
  })

  it('warn', () => {
    // tslint:disable-next-line:no-console
    const warn_ = console.warn
    const logger: Array<any> = []
    // tslint:disable-next-line:no-console
    console.warn = (a: any) => {
      logger.push(a)
    }
    warn('warn')()
    deepStrictEqual(logger, ['warn'])
    // tslint:disable-next-line:no-console
    console.warn = warn_
  })
})
