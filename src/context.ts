import * as core from '@actions/core'

export interface Inputs {
    ak: string
    sk: string
    project_id: string
    cluster_id: string
    region: string
}

/**
 * 非洲-约翰内斯堡	 af-south-1   	cce.af-south-1.myhuaweicloud.com	HTTPS
 * 华北-北京四	    cn-north-4	   cce.cn-north-4.myhuaweicloud.com	HTTPS
 * 华北-北京一	    cn-north-1	   cce.cn-north-1.myhuaweicloud.com	HTTPS
 * 华北-乌兰察布一	 cn-north-9	    cce.cn-north-9.myhuaweicloud.com	HTTPS
 * 华东-上海二	    cn-east-2	     cce.cn-east-2.myhuaweicloud.com	HTTPS
 * 华东-上海一	    cn-east-3	     cce.cn-east-3.myhuaweicloud.com	HTTPS
 * 华南-广州	      cn-south-1	   cce.cn-south-1.myhuaweicloud.com	HTTPS
 * 西南-贵阳一	    cn-southwest-2	cce.cn-southwest-2.myhuaweicloud.com	HTTPS
 * 亚太-曼谷	      ap-southeast-2	cce.ap-southeast-2.myhuaweicloud.com	HTTPS
 * 亚太-新加坡	    ap-southeast-3	cce.ap-southeast-3.myhuaweicloud.com	HTTPS
 * 中国-香港	      ap-southeast-1	cce.ap-southeast-1.myhuaweicloud.com	HTTPS
 */

export const cceSupportRegions = [
    'af-south-1',
    'cn-north-4',
    'cn-north-1',
    'cn-north-9',
    'cn-east-2',
    'cn-east-3',
    'cn-south-1',
    'cn-southwest-2',
    'ap-southeast-2',
    'ap-southeast-3',
    'ap-southeast-1'
]

export const osSupportPlatforms = ['darwin', 'linux', 'win32']

export const osSupportArchs = ['amd64', 'x64', 'arm64']

export const KUBECTL_LATEST_STABLE_URL =
    'https://storage.googleapis.com/kubernetes-release/release/stable.txt'

export const KUBECTL_DOWNLOAD_URL =
    'https://storage.googleapis.com/kubernetes-release/release/%s/bin/%s/%s/%s'

export const KUBECTL_STABLE_VERSION = 'v1.24.0'

export const LINUX_KUBECTL_INSTALL_PATH = '/usr/local/bin'

export const WINDOWS_KUBECTL_INSTALL_PATH = 'C:Windows'

export const LINUX_KUBECTL_INSTALL_NAME = 'kubectl'

export const WINDOWS_KUBECTL_INSTALL_NAME = 'kubectl.exe'

export const LINUX_KUBECTL_MOD = '755'

export const CCE_ENDPOINT = 'https://cce.%s.myhuaweicloud.com'

export const KUBECONFIG_INSTALL_COMMAND =
    'mkdir -p ~/.kube && cp %s ~/.kube/config'

export const KUBECONFIG_MODE = '600'

export function getInputs(): Inputs {
    return {
        ak: core.getInput('ak', {required: true}),
        sk: core.getInput('sk', {required: true}),
        project_id: core.getInput('project_id', {required: true}),
        cluster_id: core.getInput('cluster_id', {required: true}),
        region: core.getInput('region', {required: true})
    }
}
