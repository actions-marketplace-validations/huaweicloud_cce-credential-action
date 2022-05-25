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
exports.execCommand = exports.getKubectlNameByPlatform = exports.getOSPlatform4Kubectl = exports.getOSArch4Kubectl = exports.getOSPlatform = exports.getOSArch = exports.checkParameterIsNull = exports.checkInputs = void 0;
const core = __importStar(require("@actions/core"));
const context = __importStar(require("./context"));
const os = __importStar(require("os"));
const cp = __importStar(require("child_process"));
/**
 * 检查输入的各参数是否正常
 * @param inputs
 * @returns
 */
function checkInputs(inputs) {
    if (checkParameterIsNull(inputs.ak) ||
        checkParameterIsNull(inputs.sk) ||
        checkParameterIsNull(inputs.region) ||
        checkParameterIsNull(inputs.project_id) ||
        checkParameterIsNull(inputs.cluster_id)) {
        core.info('Please fill all the required parameters');
        return false;
    }
    if (!context.cceSupportRegions.includes(inputs.region)) {
        core.info('CCE not support in this region: ' + inputs.region);
        return false;
    }
    return true;
}
exports.checkInputs = checkInputs;
/**
 * 判断字符串是否为空
 * @param parameter
 * @returns
 */
function checkParameterIsNull(parameter) {
    return (parameter === undefined ||
        parameter === null ||
        parameter === '' ||
        parameter.trim().length == 0);
}
exports.checkParameterIsNull = checkParameterIsNull;
/**
 * 系统平台:x64,arm64
 * @returns
 */
function getOSArch() {
    const osArch = os.arch();
    core.info('Current system arch is ' + osArch);
    return osArch;
}
exports.getOSArch = getOSArch;
function getOSPlatform() {
    const osPlatform = os.platform();
    core.info('Current system platform is ' + osPlatform);
    return osPlatform;
}
exports.getOSPlatform = getOSPlatform;
function getOSArch4Kubectl(osArch) {
    return osArch === 'x64' ? 'amd64' : osArch;
}
exports.getOSArch4Kubectl = getOSArch4Kubectl;
function getOSPlatform4Kubectl(osPlatform) {
    return osPlatform === 'win32' ? 'windows' : osPlatform;
}
exports.getOSPlatform4Kubectl = getOSPlatform4Kubectl;
function getKubectlNameByPlatform(osPlatform) {
    return osPlatform === 'win32'
        ? context.WINDOWS_KUBECTL_INSTALL_NAME
        : context.LINUX_KUBECTL_INSTALL_NAME;
}
exports.getKubectlNameByPlatform = getKubectlNameByPlatform;
/**
 * 执行传入的命令，返回执行结果
 * @param command
 */
function execCommand(command) {
    return __awaiter(this, void 0, void 0, function* () {
        const execCommandResult = yield (cp.execSync(command) || '').toString();
        core.info(execCommandResult);
        return execCommandResult;
    });
}
exports.execCommand = execCommand;
//# sourceMappingURL=utils.js.map