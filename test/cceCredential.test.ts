import { Region } from '@huaweicloud/huaweicloud-sdk-core/region/region'
import {expect, test} from '@jest/globals'
import * as cce from '../src/cceCredential'
import * as context from '../src/context'
test('check install', async() => {
    // console.log("test create cce credential")
    // await cce.setK8sConfig(getInputs());
})

export function getInputs(): context.Inputs{
    return{
      ak : "***********",
      sk : "***********",
      region : "cn-north-4",
      project_id : "0dd8cb413000906a2fcdc019b5a84546",
      cluster_id: "f288d212-d299-11ec-8e06-0255ac101534"
    }
  }