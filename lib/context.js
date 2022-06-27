"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInputs = exports.KUBECONFIG_MODE = exports.KUBECONFIG_INSTALL_COMMAND = exports.CCE_ENDPOINT = exports.LINUX_KUBECTL_MOD = exports.WINDOWS_KUBECTL_INSTALL_NAME = exports.LINUX_KUBECTL_INSTALL_NAME = exports.WINDOWS_KUBECTL_INSTALL_PATH = exports.LINUX_KUBECTL_INSTALL_PATH = exports.KUBECTL_STABLE_VERSION = exports.KUBECTL_DOWNLOAD_URL = exports.KUBECTL_LATEST_STABLE_URL = exports.osSupportArchs = exports.osSupportPlatforms = exports.cceSupportRegions = void 0;
const core = __importStar(require("@actions/core"));
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
exports.cceSupportRegions = [
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
];
exports.osSupportPlatforms = ['darwin', 'linux', 'win32'];
exports.osSupportArchs = ['amd64', 'x64', 'arm64'];
exports.KUBECTL_LATEST_STABLE_URL = 'https://storage.googleapis.com/kubernetes-release/release/stable.txt';
exports.KUBECTL_DOWNLOAD_URL = 'https://storage.googleapis.com/kubernetes-release/release/%s/bin/%s/%s/%s';
exports.KUBECTL_STABLE_VERSION = 'v1.24.0';
exports.LINUX_KUBECTL_INSTALL_PATH = '/usr/local/bin';
exports.WINDOWS_KUBECTL_INSTALL_PATH = 'C:Windows';
exports.LINUX_KUBECTL_INSTALL_NAME = 'kubectl';
exports.WINDOWS_KUBECTL_INSTALL_NAME = 'kubectl.exe';
exports.LINUX_KUBECTL_MOD = '755';
exports.CCE_ENDPOINT = 'https://cce.%s.myhuaweicloud.com';
exports.KUBECONFIG_INSTALL_COMMAND = 'mkdir -p ~/.kube && cp %s ~/.kube/config';
exports.KUBECONFIG_MODE = '600';
function getInputs() {
    return {
        ak: core.getInput('ak', { required: true }),
        sk: core.getInput('sk', { required: true }),
        project_id: core.getInput('project_id', { required: true }),
        cluster_id: core.getInput('cluster_id', { required: true }),
        region: core.getInput('region', { required: true })
    };
}
exports.getInputs = getInputs;
//# sourceMappingURL=context.js.map