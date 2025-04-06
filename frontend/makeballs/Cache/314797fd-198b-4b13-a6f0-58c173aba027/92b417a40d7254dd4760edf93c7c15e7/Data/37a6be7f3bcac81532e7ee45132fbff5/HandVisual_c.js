if (script.onAwake) {
	script.onAwake();
	return;
};
function checkUndefined(property, showIfData){
   for (var i = 0; i < showIfData.length; i++){
       if (showIfData[i][0] && script[showIfData[i][0]] != showIfData[i][1]){
           return;
       }
   }
   if (script[property] == undefined){
      throw new Error('Input ' + property + ' was not provided for the object ' + script.getSceneObject().name);
   }
}
// @ui {"widget":"group_start", "label":"Hand Visual"}
// @input string handType {"widget":"combobox", "values":[{"label":"Left", "value":"left"}, {"label":"Right", "value":"right"}]}
checkUndefined("handType", []);
// @input string selectVisual = "Default" {"widget":"combobox", "values":[{"label":"Default", "value":"Default"}, {"label":"Occluder", "value":"Occluder"}]}
checkUndefined("selectVisual", []);
// @input HandInteractor handInteractor
checkUndefined("handInteractor", []);
// @input Component.RenderMeshVisual handMesh
checkUndefined("handMesh", []);
// @input float handMeshRenderOrder = 9999 {"hint":"The desired render order of the handMesh"}
checkUndefined("handMeshRenderOrder", []);
// @input SceneObject root {"hint":"Parent of both the rig and the mesh"}
checkUndefined("root", []);
// @input bool autoJointMapping = true {"hint":"If checked the HandVisual will attempt to automatically wire joints"}
checkUndefined("autoJointMapping", []);
// @ui {"widget":"group_start", "label":"Joint Setup", "showIf":"autoJointMapping", "showIfValue":false}
// @input SceneObject wrist
// @input SceneObject thumbToWrist
// @input SceneObject thumbBaseJoint
// @input SceneObject thumbKnuckle
// @input SceneObject thumbMidJoint
// @input SceneObject thumbTip
// @input SceneObject indexToWrist
// @input SceneObject indexKnuckle
// @input SceneObject indexMidJoint
// @input SceneObject indexUpperJoint
// @input SceneObject indexTip
// @input SceneObject middleToWrist
// @input SceneObject middleKnuckle
// @input SceneObject middleMidJoint
// @input SceneObject middleUpperJoint
// @input SceneObject middleTip
// @input SceneObject ringToWrist
// @input SceneObject ringKnuckle
// @input SceneObject ringMidJoint
// @input SceneObject ringUpperJoint
// @input SceneObject ringTip
// @input SceneObject pinkyToWrist
// @input SceneObject pinkyKnuckle
// @input SceneObject pinkyMidJoint
// @input SceneObject pinkyUpperJoint
// @input SceneObject pinkyTip
// @ui {"widget":"group_end"}
// @ui {"widget":"group_start", "label":"Glow Effect"}
// @input bool shouldThumbPokeGlow {"hint":"Whether or not the thumb should glow when poking"}
checkUndefined("shouldThumbPokeGlow", []);
// @input Asset.RenderMesh unitPlaneMesh {"hint":"The plane mesh on which the glow texture/material will be rendered"}
checkUndefined("unitPlaneMesh", []);
// @input Asset.Material tipGlowMaterial {"hint":"The material which will be manipulated to create the glow effect"}
checkUndefined("tipGlowMaterial", []);
// @input vec4 hoverColor {"hint":"The color the glow will be when you are not pinching/poking", "widget":"color"}
checkUndefined("hoverColor", []);
// @input vec4 triggerColor {"hint":"The color the glow will be when you are pinching/poking", "widget":"color"}
checkUndefined("triggerColor", []);
// @input vec4 behindColor {"hint":"The color the glow will be when you are pinching/poking too far", "widget":"color"}
checkUndefined("behindColor", []);
// @input float tapProximityThreshold {"hint":"How close index finger of tapping hand has to be to tapped hand to initiate tap glow"}
checkUndefined("tapProximityThreshold", []);
// @input Asset.Texture pinchTexture {"hint":"The texture applied to the hand when creating pinch glow effect"}
checkUndefined("pinchTexture", []);
// @input Asset.Texture tapTexture {"hint":"The texture applied to the hand when creating tap glow effect"}
checkUndefined("tapTexture", []);
// @input float tipGlowRenderOrder = 10000 {"hint":"The render order of the quad on which the tip glow effect occurs"}
checkUndefined("tipGlowRenderOrder", []);
// @ui {"widget":"group_end"}
// @ui {"widget":"group_start", "label":"Radial Gradient Occlusion"}
// @input bool occluderEnabled {"hint":"Whether or not the radial gradient occluder is enabled"}
checkUndefined("occluderEnabled", []);
// @input Asset.RenderMesh occluderUnitPlaneMesh {"hint":"The plane mesh the radial gradient occluder will be rendered"}
checkUndefined("occluderUnitPlaneMesh", []);
// @input Asset.Material radialGradientOcclusionMaterial {"hint":"The material which will be create the gradient occlusion effect"}
checkUndefined("radialGradientOcclusionMaterial", []);
// @input float gradientQuadRenderOrder = 9997 {"hint":"The render order of the gradient quad tracked to the hand"}
checkUndefined("gradientQuadRenderOrder", []);
// @ui {"widget":"group_end"}
// @ui {"widget":"group_end"}
// @ui {"widget":"group_start", "label":"Hand Mesh Materials"}
// @input Asset.Material handOutlineMaterial {"hint":"The material which will be create the default visual effect on the hand mesh"}
checkUndefined("handOutlineMaterial", []);
// @input Asset.Material handOccluderMaterial {"hint":"The material which will be create the occluder visual effect on the hand mesh"}
checkUndefined("handOccluderMaterial", []);
// @ui {"widget":"group_end"}
var scriptPrototype = Object.getPrototypeOf(script);
if (!global.BaseScriptComponent){
   function BaseScriptComponent(){}
   global.BaseScriptComponent = BaseScriptComponent;
   global.BaseScriptComponent.prototype = scriptPrototype;
   global.BaseScriptComponent.prototype.__initialize = function(){};
   global.BaseScriptComponent.getTypeName = function(){
       throw new Error("Cannot get type name from the class, not decorated with @component");
   }
}
var Module = require("../../../../../../../Modules/Src/Assets/SpectaclesInteractionKit/Components/Interaction/HandVisual/HandVisual");
Object.setPrototypeOf(script, Module.HandVisual.prototype);
script.__initialize();
if (script.onAwake) {
   script.onAwake();
}
