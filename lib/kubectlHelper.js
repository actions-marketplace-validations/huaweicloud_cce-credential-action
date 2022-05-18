"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
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
exports.getKubectlLatestStableDownloadUrl = exports.getKubectlDownlodPath = exports.installOrUpdateKubectl = exports.getLatestKubectlStableVersion = exports.checkKubectlInstall = exports.checkAndInstallKubectl = void 0;
const core = __importStar(require("@actions/core"));
const io = __importStar(require("@actions/io"));
const utils = __importStar(require("./utils"));
const context = __importStar(require("./context"));
const uuid_1 = require("uuid");
const toolCache = __importStar(require("@actions/tool-cache"));
const fs = __importStar(require("fs"));
const util = __importStar(require("util"));
function checkAndInstallKubectl() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!(yield checkKubectlInstall())) {
            yield installOrUpdateKubectl();
            return yield checkKubectlInstall();
        }
        return true;
    });
}
exports.checkAndInstallKubectl = checkAndInstallKubectl;
/**
 * 检查sshpass是否已经在系统上完成安装，并输出版本
 * @returns
 */
function checkKubectlInstall() {
    return __awaiter(this, void 0, void 0, function* () {
        const kubectlPath = yield io.which('kubectl');
        if (!kubectlPath) {
            core.info('kubectl did not installed or set to the path');
            return false;
        }
        core.info('kubectl already installed and set to path: ' + kubectlPath);
        yield utils.execCommand(`${kubectlPath} version --client --short`);
        return true;
    });
}
exports.checkKubectlInstall = checkKubectlInstall;
/**
 * 到kubectl的release页面获取release版本列表，拿到最新的版本
 * @returns
 */
function getLatestKubectlStableVersion() {
    return __awaiter(this, void 0, void 0, function* () {
        core.info('latest tag api address ' + context.KUBECTL_LATEST_STABLE_URL);
        const tmpKubectlVersionDownloadDir = './tmp/kubectl/' + uuid_1.v4();
        return yield toolCache
            .downloadTool(context.KUBECTL_LATEST_STABLE_URL, tmpKubectlVersionDownloadDir)
            .then(kubectlDownloadPath => {
            core.info('kubectlVersionTmpDownloadPath ' + kubectlDownloadPath);
            const kubectlLatestStableVersion = fs
                .readFileSync(kubectlDownloadPath, 'utf8')
                .toString()
                .trim();
            if (!kubectlLatestStableVersion) {
                return context.KUBECTL_STABLE_VERSION;
            }
            core.info('latest kubectl version ' + kubectlLatestStableVersion);
            return kubectlLatestStableVersion;
        }, error => {
            core.info('error ' + error);
            core.warning(util.format('Failed to read latest kubectl verison from %s. Using default stable version %s', context.KUBECTL_LATEST_STABLE_URL, context.KUBECTL_STABLE_VERSION));
            return context.KUBECTL_STABLE_VERSION;
        });
    });
}
exports.getLatestKubectlStableVersion = getLatestKubectlStableVersion;
/**
 * 根据当前平台计算出需要下载的Kubectl下载地址
 * 完成软件包下载
 * 将软件包拷贝到 /usr/local/bin/kubectl
 * 将软件包的权限设置为755
 */
function installOrUpdateKubectl() {
    return __awaiter(this, void 0, void 0, function* () {
        const osArch = utils.getOSArch();
        const osPlatform = utils.getOSPlatform();
        const installName = utils.getKubectlNameByPlatform(osPlatform);
        core.info('osArch : ' +
            osArch +
            ' osPlatform : ' +
            osPlatform +
            ' installName : ' +
            installName);
        if (!context.osSupportArchs.includes(osArch) ||
            !context.osSupportPlatforms.includes(osPlatform)) {
            core.info('kubectl can not install on this platform or arch');
            return;
        }
        const currentArch = utils.getOSArch4Kubectl(osArch);
        const kubectlName = utils.getOSPlatform4Kubectl(osPlatform);
        const kubectlLatestStableVersion = yield getLatestKubectlStableVersion();
        const kubectlDownloadUrl = getKubectlLatestStableDownloadUrl(kubectlLatestStableVersion, osPlatform, currentArch, installName);
        const kubectlDownloadPath = yield getKubectlDownlodPath(kubectlDownloadUrl);
        if (utils.checkParameterIsNull(kubectlDownloadPath)) {
            core.info('download kubectl failed');
            return;
        }
        if (osPlatform === 'win32') {
            yield utils.execCommand('cp ' +
                kubectlDownloadPath +
                ' ' +
                context.WINDOWS_KUBECTL_INSTALL_PATH +
                '/' +
                context.WINDOWS_KUBECTL_INSTALL_NAME);
        }
        else {
            yield utils.execCommand('sudo cp ' +
                kubectlDownloadPath +
                ' ' +
                context.LINUX_KUBECTL_INSTALL_PATH +
                '/' +
                context.LINUX_KUBECTL_INSTALL_NAME);
        }
        yield utils.execCommand('sudo chmod ' +
            context.LINUX_KUBECTL_MOD +
            ' ' +
            context.LINUX_KUBECTL_INSTALL_PATH +
            '/' +
            context.LINUX_KUBECTL_INSTALL_NAME);
        fs.rmSync(kubectlDownloadPath);
        core.info('install or update new kubect version : ' +
            (yield utils.execCommand('which kubectl && kubectl version --client --short')));
    });
}
exports.installOrUpdateKubectl = installOrUpdateKubectl;
/**
 * 根据URL下载最新版本的kubect
 * @param kubectlDownloadUrl
 * @returns
 */
function getKubectlDownlodPath(kubectlDownloadUrl) {
    return __awaiter(this, void 0, void 0, function* () {
        const tmpKubectlDownloadDir = './tmp/kubectl';
        const tmpKubectlDownloadPath = tmpKubectlDownloadDir +
            '/' +
            kubectlDownloadUrl.substring(kubectlDownloadUrl.lastIndexOf('/') + 1);
        let kubectlDownloadPath = '';
        try {
            core.info('download kubectl for install or update from ' + kubectlDownloadUrl);
            kubectlDownloadPath = yield toolCache.downloadTool(kubectlDownloadUrl, tmpKubectlDownloadPath);
        }
        catch (error) {
            core.info('Failed to download kubectl from ' +
                kubectlDownloadUrl +
                ' error info ' +
                error);
        }
        core.info(kubectlDownloadPath);
        return kubectlDownloadPath;
    });
}
exports.getKubectlDownlodPath = getKubectlDownlodPath;
/**
 * 根据传入的参数，构造kubectl下载链接
 * @param stableVersion
 * @param osPlatform
 * @param osArch
 * @param kubectlName
 * @returns
 */
function getKubectlLatestStableDownloadUrl(stableVersion, osPlatform, osArch, kubectlName) {
    const kubectlDownloadUrl = util.format(context.KUBECTL_DOWNLOAD_URL, stableVersion, osPlatform, osArch, kubectlName);
    core.info('download kubectl version : ' +
        stableVersion +
        ' for current ' +
        osArch +
        ' platform ' +
        osPlatform +
        ',download url ' +
        kubectlDownloadUrl);
    return kubectlDownloadUrl;
}
exports.getKubectlLatestStableDownloadUrl = getKubectlLatestStableDownloadUrl;
//# sourceMappingURL=kubectlHelper.js.map