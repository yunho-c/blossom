"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Setup = void 0;
var __selfType = requireType("./Setup");
function component(target) { target.getTypeName = function () { return __selfType; }; }
let Setup = class Setup extends BaseScriptComponent {
    onAwake() {
        this.init();
        // this.createEvent("UpdateEvent").bind(this.onUpdate.bind(this))
    }
    init() {
        // this.toolSpawnPointsT = []
        // this.latestObj = []
        // this.latestObjT = []
        // this.spanwAllTools()
        this.spawnBalls();
    }
    spawnBalls() {
    }
};
exports.Setup = Setup;
exports.Setup = Setup = __decorate([
    component
], Setup);
//# sourceMappingURL=Setup.js.map