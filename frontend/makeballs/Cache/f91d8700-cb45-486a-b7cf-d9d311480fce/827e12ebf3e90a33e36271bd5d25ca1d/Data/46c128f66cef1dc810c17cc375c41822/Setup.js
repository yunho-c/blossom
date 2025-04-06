"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewScript = exports.Setup = void 0;
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
let NewScript = class NewScript extends BaseScriptComponent {
    onAwake() {
        this.init();
    }
    init() {
        this.spawnPoints = [];
        this.generateAll();
    }
    generate() {
        // let newball = this.ball.instantiate(this.getSceneObject()); // NOTE: I think `this.getSceneObject()` makes it replace the current object
        let newball = this.ball.instantiate(this.containerObj);
        newball.getTransform().setWorldPosition(this.getSceneObject().getTransform().getWorldPosition());
        print("gen triggered");
    }
    generateAll() {
        this.spawnPoints.forEach((value, ind) => {
            let spawnPoint = value;
            this.spawnPointsT[ind] = spawnPoint.getTransform();
            this.generate();
        });
    }
};
exports.NewScript = NewScript;
exports.NewScript = NewScript = __decorate([
    component
], NewScript);
//# sourceMappingURL=Setup.js.map