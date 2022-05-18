import * as utils from '../src/utils'
import {expect, test} from '@jest/globals'
import * as context from '../src/context'

test('check ipv4', () => {
  // expect(utils.checkIPV4Addr('192.168.1.1')).toEqual(true)
  // expect(utils.checkIPV4Addr('0.0.0.0')).toEqual(true)
  // expect(utils.checkIPV4Addr('256.1.1.2')).toEqual(false)
  // expect(utils.checkIPV4Addr('10.197.68.254')).toEqual(true)
  // expect(utils.checkIPV4Addr('10.197.68.256')).toEqual(false)
  // expect(utils.checkIPV4Addr('10.197.68.256.19')).toEqual(false)
  // console.info("check ipv4 127.0.0.1")
  // expect(utils.checkIPV4Addr('127.0.0.1.')).toEqual(true)
})

test('check os,platform,arch', async() => {
  // const osArch = utils.getOSArch();
  // const osPlatform = utils.getOSPlatform();
  // // const osType = utils.getOSType();
  // console.log("osArch " + osArch)
  // console.log("osPlatform " + osPlatform)
  // // console.log("osType " + osType)
})

//kubectl version str kubectl version --client --short | grep Client