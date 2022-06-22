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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCCECredential = exports.installKubeConfig = exports.setK8sConfig = void 0;
const uuid_1 = require("uuid");
const fs = __importStar(require("fs"));
const core = __importStar(require("@actions/core"));
const utils = __importStar(require("./utils"));
const util = __importStar(require("util"));
const context = __importStar(require("./context"));
const huaweicloud_sdk_core_1 = require("@huaweicloud/huaweicloud-sdk-core");
const huaweicloud_sdk_cce_1 = require("@huaweicloud/huaweicloud-sdk-cce");
/**
 * 通过CCE SDK获取 kubeconfig，并部署到指定位置
 * @param inputs
 */
function setK8sConfig(inputs) {
    return __awaiter(this, void 0, void 0, function* () {
        const creResult = yield getCCECredential(inputs);
        if (utils.checkParameterIsNull(creResult)) {
            core.setFailed('get kubeconfig error');
            return;
        }
        if (creResult.indexOf('errorMsg') > -1 ||
            creResult.indexOf('errorCode') > -1) {
            core.setFailed('Failed to get kubeconfig by CCE SDK,error message ' + creResult);
            return;
        }
        yield utils.execCommand('mkdir -p ./tmp');
        const kubeconfigPath = './tmp/kubeconfig_' + (0, uuid_1.v4)();
        core.info(`Writing kubeconfig contents to ${kubeconfigPath}`);
        fs.writeFileSync(kubeconfigPath, creResult);
        fs.chmodSync(kubeconfigPath, context.KUBECONFIG_MODE);
        core.setSecret(kubeconfigPath);
        core.exportVariable('KUBECONFIG', kubeconfigPath);
        console.log('KUBECONFIG environment variable is set');
        yield installKubeConfig(kubeconfigPath);
    });
}
exports.setK8sConfig = setK8sConfig;
/**
 * 将kubeconfig部署到指定位置
 * 执行简单命令检查kubectl是否可以连接上远端的k8s集群
 * @param kubeconfigPath
 */
function installKubeConfig(kubeconfigPath) {
    return __awaiter(this, void 0, void 0, function* () {
        const installCommand = util.format(context.KUBECONFIG_INSTALL_COMMAND, kubeconfigPath);
        yield utils.execCommand(installCommand);
        console.log('kubectl config is already set');
        const viewClustInfo = 'kubectl config view && kubectl cluster-info && kubectl get pod,svc --all-namespaces';
        yield utils.execCommand(viewClustInfo);
    });
}
exports.installKubeConfig = installKubeConfig;
/**
 * 调用CCE SDK获取CCE集群的kubeconfig
 * @param inputs
 * @returns
 */
function getCCECredential(inputs) {
    return __awaiter(this, void 0, void 0, function* () {
        const endpoint = util.format(context.CCE_ENDPOINT, inputs.region);
        const credentials = new huaweicloud_sdk_core_1.BasicCredentials()
            .withAk(inputs.ak)
            .withSk(inputs.sk)
            .withProjectId(inputs.project_id);
        const client = huaweicloud_sdk_cce_1.CceClient.newBuilder()
            .withCredential(credentials)
            .withEndpoint(endpoint)
            .build();
        const request = new huaweicloud_sdk_cce_1.CreateKubernetesClusterCertRequest();
        request.clusterId = inputs.cluster_id;
        const body = new huaweicloud_sdk_cce_1.CertDuration();
        body.withDuration(1);
        request.withBody(body);
        try {
            const result = yield client.createKubernetesClusterCert(request);
            return JSON.stringify(result);
        }
        catch (error) {
            core.error(JSON.stringify(error));
            return '';
        }
    });
}
exports.getCCECredential = getCCECredential;
//# sourceMappingURL=cceCredential.js.map