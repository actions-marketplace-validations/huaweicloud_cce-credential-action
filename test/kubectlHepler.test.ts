import * as utils from '../src/utils'
import {expect, test} from '@jest/globals'
import * as kubectlHelper from '../src/kubectlHelper'

test('test get latest stable kubectl version', async() => {
    //console.log(await kubectlHelper.getLatestKubectlStableVersion())
  })
/** */
test('test get curent latest kubectl download address', async() => {
    const latestStableVersion = await kubectlHelper.getLatestKubectlStableVersion();
    const osArch = utils.getOSArch4Kubectl(utils.getOSArch());
    const osPlatform = utils.getOSPlatform();
    const installName = utils.getKubectlNameByPlatform(osPlatform);
    console.log("osArch " + osArch);
    console.log("osPlatform " + osPlatform);
    console.log("installName " + installName);
    console.log(await kubectlHelper.getKubectlLatestStableDownloadUrl(latestStableVersion,osPlatform,osArch,installName))
})

test('test get windows x86 latest kubectl download address', async() => {
    const latestStableVersion = "v1.24.0";
    const winArch = "x64"
    const osPlatform = "win32"
    expect(await getKubectlDownloadPath(latestStableVersion,winArch,osPlatform))
      .toEqual("https://storage.googleapis.com/kubernetes-release/release/v1.24.0/bin/windows/amd64/kubectl.exe")
})

test('test get windows arm64 latest kubectl download address', async() => {
    const latestStableVersion = "v1.24.0";
    const winArch = "arm64"
    const osPlatform = "win32"
    expect(await getKubectlDownloadPath(latestStableVersion,winArch,osPlatform))
    .toEqual("https://storage.googleapis.com/kubernetes-release/release/v1.24.0/bin/windows/arm64/kubectl.exe")

})

test('test get linux x86 latest kubectl download address', async() => {
    const latestStableVersion = "v1.24.0";
    const winArch = "x64"
    const osPlatform = "linux"
    expect(await getKubectlDownloadPath(latestStableVersion,winArch,osPlatform))
    .toEqual("https://storage.googleapis.com/kubernetes-release/release/v1.24.0/bin/linux/amd64/kubectl")
})

test('test get linux arm64 latest kubectl download address', async() => {
    const latestStableVersion = "v1.24.0";
    const winArch = "arm64"
    const osPlatform = "linux"
    expect(await getKubectlDownloadPath(latestStableVersion,winArch,osPlatform))
    .toEqual("https://storage.googleapis.com/kubernetes-release/release/v1.24.0/bin/linux/arm64/kubectl")

})

test('test get macos x86 latest kubectl download address', async() => {
    const latestStableVersion = "v1.24.0";
    const winArch = "x64"
    const osPlatform = "darwin"
    expect(await getKubectlDownloadPath(latestStableVersion,winArch,osPlatform))
    .toEqual("https://storage.googleapis.com/kubernetes-release/release/v1.24.0/bin/darwin/amd64/kubectl")
})

test('test get macos arm64 latest kubectl download address', async() => {
    const latestStableVersion = "v1.24.0";
    const winArch = "arm64"
    const osPlatform = "darwin"
    expect(await getKubectlDownloadPath(latestStableVersion,winArch,osPlatform))
    .toEqual("https://storage.googleapis.com/kubernetes-release/release/v1.24.0/bin/darwin/arm64/kubectl")

})

export async function getKubectlDownloadPath(version:string,arch:string,platform:string):Promise<string>{
    const osArch = utils.getOSArch4Kubectl(arch);
    const osPlatform = utils.getOSPlatform4Kubectl(platform);
    const installName = utils.getKubectlNameByPlatform(platform);
    console.log("osArch " + osArch);
    console.log("osPlatform " + osPlatform);
    console.log("installName " + installName);
    return await kubectlHelper.getKubectlLatestStableDownloadUrl(version,osPlatform,osArch,installName)
}


//http://cloudbuild-tools.obs.cn-north-7.ulanqab.huawei.com:80/kubectl/kubectl

test('test get kubectl from inner obs share address', async() => {
    //const kubectlDownloadAddress = "http://cloudbuild-tools.obs.cn-north-7.ulanqab.huawei.com:80/kubectl/kubectl"
    // await kubectlHelper.getLatestKubectlStableVersion();
    //await kubectlHelper.getKubectlDownlodPath(kubectlDownloadAddress);
    //console.log(await kubectlHelper.getLatestKubectlStableVersion())
})