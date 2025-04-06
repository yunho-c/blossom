#include <metal_stdlib>
#include <simd/simd.h>
using namespace metal;
#define SC_USE_USER_DEFINED_VS_MAIN
//efine SC_DISABLE_FRUSTUM_CULLING
#define SC_ALLOW_16_TEXTURES
namespace SNAP_VS {
int sc_GetStereoViewIndex()
{
    return 0;
}
}
    #ifndef sc_TextureRenderingLayout_Regular
        #define sc_TextureRenderingLayout_Regular 0
        #define sc_TextureRenderingLayout_StereoInstancedClipped 1
        #define sc_TextureRenderingLayout_StereoMultiview 2
    #endif
    #define depthToGlobal   depthScreenToViewSpace
    #define depthToLocal    depthViewToScreenSpace
    #ifndef quantizeUV
        #define quantizeUV sc_QuantizeUV
        #define sc_platformUVFlip sc_PlatformFlipV
        #define sc_PlatformFlipUV sc_PlatformFlipV
    #endif
    #ifndef sc_SampleTexture
        #define sc_SampleTexture sc_SampleTextureBiasOrLevel
    #endif
    #ifndef sc_texture2DLod
        #define sc_texture2DLod sc_InternalTextureLevel
        #define sc_textureLod sc_InternalTextureLevel
        #define sc_textureBias sc_InternalTextureBiasOrLevel
        #define sc_texture sc_InternalTexture
    #endif
//SG_REFLECTION_BEGIN(200)
//attribute vec4 boneData 5
//attribute vec3 blendShape0Pos 6
//attribute vec3 blendShape0Normal 12
//attribute vec3 blendShape1Pos 7
//attribute vec3 blendShape1Normal 13
//attribute vec3 blendShape2Pos 8
//attribute vec3 blendShape2Normal 14
//attribute vec3 blendShape3Pos 9
//attribute vec3 blendShape4Pos 10
//attribute vec3 blendShape5Pos 11
//attribute vec4 position 0
//attribute vec3 normal 1
//attribute vec4 tangent 2
//attribute vec2 texture0 3
//attribute vec2 texture1 4
//attribute vec3 positionNext 15
//attribute vec3 positionPrevious 16
//attribute vec4 strandProperties 17
//output vec4 FragColor0 0
//output vec4 FragColor1 1
//output vec4 FragColor2 2
//output vec4 FragColor3 3
//sampler sampler renderTarget0SmpSC 0:11
//sampler sampler renderTarget1SmpSC 0:12
//sampler sampler renderTarget2SmpSC 0:13
//sampler sampler renderTarget3SmpSC 0:14
//texture texture2D renderTarget0 0:1:0:11
//texture texture2D renderTarget1 0:2:0:12
//texture texture2D renderTarget2 0:3:0:13
//texture texture2D renderTarget3 0:4:0:14
//ubo float sc_BonesUBO 0:0:96 {
//sc_Bone_t sc_Bones 0:[]:96
//float4 sc_Bones.boneMatrix 0:[3]:16
//float4 sc_Bones.normalMatrix 48:[3]:16
//}
//ubo int UserUniforms 0:21:4016 {
//sc_PointLight_t sc_PointLights 0:[3]:80
//bool sc_PointLights.falloffEnabled 0
//float sc_PointLights.falloffEndDistance 4
//float sc_PointLights.negRcpFalloffEndDistance4 8
//float sc_PointLights.angleScale 12
//float sc_PointLights.angleOffset 16
//float3 sc_PointLights.direction 32
//float3 sc_PointLights.position 48
//float4 sc_PointLights.color 64
//sc_DirectionalLight_t sc_DirectionalLights 240:[5]:32
//float3 sc_DirectionalLights.direction 0
//float4 sc_DirectionalLights.color 16
//sc_AmbientLight_t sc_AmbientLights 400:[3]:32
//float3 sc_AmbientLights.color 0
//float sc_AmbientLights.intensity 16
//sc_LightEstimationData_t sc_LightEstimationData 496
//sc_SphericalGaussianLight_t sc_LightEstimationData.sg 0:[12]:48
//float3 sc_LightEstimationData.sg.color 0
//float sc_LightEstimationData.sg.sharpness 16
//float3 sc_LightEstimationData.sg.axis 32
//float3 sc_LightEstimationData.ambientLight 576
//float4 sc_EnvmapDiffuseSize 1088
//float4 sc_EnvmapDiffuseDims 1104
//float4 sc_EnvmapDiffuseView 1120
//float4 sc_EnvmapSpecularSize 1136
//float4 sc_EnvmapSpecularDims 1152
//float4 sc_EnvmapSpecularView 1168
//float3 sc_EnvmapRotation 1184
//float sc_EnvmapExposure 1200
//float3 sc_Sh 1216:[9]:16
//float sc_ShIntensity 1360
//float4 sc_Time 1376
//float4 sc_UniformConstants 1392
//float4 sc_GeometryInfo 1408
//float4x4 sc_ModelViewProjectionMatrixArray 1424:[2]:64
//float4x4 sc_ModelViewProjectionMatrixInverseArray 1552:[2]:64
//float4x4 sc_ViewProjectionMatrixArray 1680:[2]:64
//float4x4 sc_ViewProjectionMatrixInverseArray 1808:[2]:64
//float4x4 sc_ModelViewMatrixArray 1936:[2]:64
//float4x4 sc_ModelViewMatrixInverseArray 2064:[2]:64
//float3x3 sc_ViewNormalMatrixArray 2192:[2]:48
//float3x3 sc_ViewNormalMatrixInverseArray 2288:[2]:48
//float4x4 sc_ProjectionMatrixArray 2384:[2]:64
//float4x4 sc_ProjectionMatrixInverseArray 2512:[2]:64
//float4x4 sc_ViewMatrixArray 2640:[2]:64
//float4x4 sc_ViewMatrixInverseArray 2768:[2]:64
//float4x4 sc_PrevFrameViewProjectionMatrixArray 2896:[2]:64
//float4x4 sc_ModelMatrix 3024
//float4x4 sc_ModelMatrixInverse 3088
//float3x3 sc_NormalMatrix 3152
//float3x3 sc_NormalMatrixInverse 3200
//float4x4 sc_PrevFrameModelMatrix 3248
//float4x4 sc_PrevFrameModelMatrixInverse 3312
//float3 sc_LocalAabbMin 3376
//float3 sc_LocalAabbMax 3392
//float3 sc_WorldAabbMin 3408
//float3 sc_WorldAabbMax 3424
//float4 sc_WindowToViewportTransform 3440
//float4 sc_CurrentRenderTargetDims 3456
//sc_Camera_t sc_Camera 3472
//float3 sc_Camera.position 0
//float sc_Camera.aspect 16
//float2 sc_Camera.clipPlanes 24
//float sc_ShadowDensity 3504
//float4 sc_ShadowColor 3520
//float4x4 sc_ProjectorMatrix 3536
//float _sc_GetFramebufferColorInvalidUsageMarker 3600
//float shaderComplexityValue 3604
//float sc_DisableFrustumCullingMarker 3608
//float4 weights0 3616
//float4 weights1 3632
//float4 weights2 3648
//float4 sc_StereoClipPlanes 3664:[2]:16
//int sc_FallbackInstanceID 3696
//float _sc_framebufferFetchMarker 3700
//float2 sc_TAAJitterOffset 3704
//float strandWidth 3712
//float strandTaper 3716
//float4 sc_StrandDataMapTextureSize 3728
//float clumpInstanceCount 3744
//float clumpRadius 3748
//float clumpTipScale 3752
//float hairstyleInstanceCount 3756
//float hairstyleNoise 3760
//float4 sc_ScreenTextureSize 3776
//float4 sc_ScreenTextureDims 3792
//float4 sc_ScreenTextureView 3808
//float4 renderTarget0Size 3824
//float4 renderTarget0Dims 3840
//float4 renderTarget0View 3856
//float4 renderTarget1Size 3872
//float4 renderTarget1Dims 3888
//float4 renderTarget1View 3904
//float4 renderTarget2Size 3920
//float4 renderTarget2Dims 3936
//float4 renderTarget2View 3952
//float4 renderTarget3Size 3968
//float4 renderTarget3Dims 3984
//float4 renderTarget3View 4000
//}
//spec_const bool renderTarget0HasSwappedViews 0
//spec_const bool renderTarget1HasSwappedViews 1
//spec_const bool renderTarget2HasSwappedViews 2
//spec_const bool renderTarget3HasSwappedViews 3
//spec_const int renderTarget0Layout 4
//spec_const int renderTarget1Layout 5
//spec_const int renderTarget2Layout 6
//spec_const int renderTarget3Layout 7
//spec_const int sc_ShaderCacheConstant 8
//spec_const int sc_StereoRenderingMode 9
//spec_const int sc_StereoRendering_IsClipDistanceEnabled 10
//SG_REFLECTION_END
constant bool renderTarget0HasSwappedViews [[function_constant(0)]];
constant bool renderTarget0HasSwappedViews_tmp = is_function_constant_defined(renderTarget0HasSwappedViews) ? renderTarget0HasSwappedViews : false;
constant bool renderTarget1HasSwappedViews [[function_constant(1)]];
constant bool renderTarget1HasSwappedViews_tmp = is_function_constant_defined(renderTarget1HasSwappedViews) ? renderTarget1HasSwappedViews : false;
constant bool renderTarget2HasSwappedViews [[function_constant(2)]];
constant bool renderTarget2HasSwappedViews_tmp = is_function_constant_defined(renderTarget2HasSwappedViews) ? renderTarget2HasSwappedViews : false;
constant bool renderTarget3HasSwappedViews [[function_constant(3)]];
constant bool renderTarget3HasSwappedViews_tmp = is_function_constant_defined(renderTarget3HasSwappedViews) ? renderTarget3HasSwappedViews : false;
constant int renderTarget0Layout [[function_constant(4)]];
constant int renderTarget0Layout_tmp = is_function_constant_defined(renderTarget0Layout) ? renderTarget0Layout : 0;
constant int renderTarget1Layout [[function_constant(5)]];
constant int renderTarget1Layout_tmp = is_function_constant_defined(renderTarget1Layout) ? renderTarget1Layout : 0;
constant int renderTarget2Layout [[function_constant(6)]];
constant int renderTarget2Layout_tmp = is_function_constant_defined(renderTarget2Layout) ? renderTarget2Layout : 0;
constant int renderTarget3Layout [[function_constant(7)]];
constant int renderTarget3Layout_tmp = is_function_constant_defined(renderTarget3Layout) ? renderTarget3Layout : 0;
constant int sc_ShaderCacheConstant [[function_constant(8)]];
constant int sc_ShaderCacheConstant_tmp = is_function_constant_defined(sc_ShaderCacheConstant) ? sc_ShaderCacheConstant : 0;
constant int sc_StereoRenderingMode [[function_constant(9)]];
constant int sc_StereoRenderingMode_tmp = is_function_constant_defined(sc_StereoRenderingMode) ? sc_StereoRenderingMode : 0;
constant int sc_StereoRendering_IsClipDistanceEnabled [[function_constant(10)]];
constant int sc_StereoRendering_IsClipDistanceEnabled_tmp = is_function_constant_defined(sc_StereoRendering_IsClipDistanceEnabled) ? sc_StereoRendering_IsClipDistanceEnabled : 0;

namespace SNAP_VS {
struct sc_Vertex_t
{
float4 position;
float3 normal;
float3 tangent;
float2 texture0;
float2 texture1;
};
struct sc_PointLight_t
{
int falloffEnabled;
float falloffEndDistance;
float negRcpFalloffEndDistance4;
float angleScale;
float angleOffset;
float3 direction;
float3 position;
float4 color;
};
struct sc_DirectionalLight_t
{
float3 direction;
float4 color;
};
struct sc_AmbientLight_t
{
float3 color;
float intensity;
};
struct sc_SphericalGaussianLight_t
{
float3 color;
float sharpness;
float3 axis;
};
struct sc_LightEstimationData_t
{
sc_SphericalGaussianLight_t sg[12];
float3 ambientLight;
};
struct sc_Camera_t
{
float3 position;
float aspect;
float2 clipPlanes;
};
struct userUniformsObj
{
sc_PointLight_t sc_PointLights[3];
sc_DirectionalLight_t sc_DirectionalLights[5];
sc_AmbientLight_t sc_AmbientLights[3];
sc_LightEstimationData_t sc_LightEstimationData;
float4 sc_EnvmapDiffuseSize;
float4 sc_EnvmapDiffuseDims;
float4 sc_EnvmapDiffuseView;
float4 sc_EnvmapSpecularSize;
float4 sc_EnvmapSpecularDims;
float4 sc_EnvmapSpecularView;
float3 sc_EnvmapRotation;
float sc_EnvmapExposure;
float3 sc_Sh[9];
float sc_ShIntensity;
float4 sc_Time;
float4 sc_UniformConstants;
float4 sc_GeometryInfo;
float4x4 sc_ModelViewProjectionMatrixArray[2];
float4x4 sc_ModelViewProjectionMatrixInverseArray[2];
float4x4 sc_ViewProjectionMatrixArray[2];
float4x4 sc_ViewProjectionMatrixInverseArray[2];
float4x4 sc_ModelViewMatrixArray[2];
float4x4 sc_ModelViewMatrixInverseArray[2];
float3x3 sc_ViewNormalMatrixArray[2];
float3x3 sc_ViewNormalMatrixInverseArray[2];
float4x4 sc_ProjectionMatrixArray[2];
float4x4 sc_ProjectionMatrixInverseArray[2];
float4x4 sc_ViewMatrixArray[2];
float4x4 sc_ViewMatrixInverseArray[2];
float4x4 sc_PrevFrameViewProjectionMatrixArray[2];
float4x4 sc_ModelMatrix;
float4x4 sc_ModelMatrixInverse;
float3x3 sc_NormalMatrix;
float3x3 sc_NormalMatrixInverse;
float4x4 sc_PrevFrameModelMatrix;
float4x4 sc_PrevFrameModelMatrixInverse;
float3 sc_LocalAabbMin;
float3 sc_LocalAabbMax;
float3 sc_WorldAabbMin;
float3 sc_WorldAabbMax;
float4 sc_WindowToViewportTransform;
float4 sc_CurrentRenderTargetDims;
sc_Camera_t sc_Camera;
float sc_ShadowDensity;
float4 sc_ShadowColor;
float4x4 sc_ProjectorMatrix;
float _sc_GetFramebufferColorInvalidUsageMarker;
float shaderComplexityValue;
float sc_DisableFrustumCullingMarker;
float4 weights0;
float4 weights1;
float4 weights2;
float4 sc_StereoClipPlanes[2];
int sc_FallbackInstanceID;
float _sc_framebufferFetchMarker;
float2 sc_TAAJitterOffset;
float strandWidth;
float strandTaper;
float4 sc_StrandDataMapTextureSize;
float clumpInstanceCount;
float clumpRadius;
float clumpTipScale;
float hairstyleInstanceCount;
float hairstyleNoise;
float4 sc_ScreenTextureSize;
float4 sc_ScreenTextureDims;
float4 sc_ScreenTextureView;
float4 renderTarget0Size;
float4 renderTarget0Dims;
float4 renderTarget0View;
float4 renderTarget1Size;
float4 renderTarget1Dims;
float4 renderTarget1View;
float4 renderTarget2Size;
float4 renderTarget2Dims;
float4 renderTarget2View;
float4 renderTarget3Size;
float4 renderTarget3Dims;
float4 renderTarget3View;
};
struct sc_Bone_t
{
float4 boneMatrix[3];
float4 normalMatrix[3];
};
struct sc_Bones_obj
{
sc_Bone_t sc_Bones[1];
};
struct sc_Set0
{
constant sc_Bones_obj* sc_BonesUBO [[id(0)]];
texture2d<float> renderTarget0 [[id(1)]];
texture2d<float> renderTarget1 [[id(2)]];
texture2d<float> renderTarget2 [[id(3)]];
texture2d<float> renderTarget3 [[id(4)]];
sampler renderTarget0SmpSC [[id(11)]];
sampler renderTarget1SmpSC [[id(12)]];
sampler renderTarget2SmpSC [[id(13)]];
sampler renderTarget3SmpSC [[id(14)]];
constant userUniformsObj* UserUniforms [[id(21)]];
};
struct main_vert_out
{
float3 varPos [[user(locn0)]];
float3 varNormal [[user(locn1)]];
float4 varTangent [[user(locn2)]];
float4 varPackedTex [[user(locn3)]];
float4 varScreenPos [[user(locn4)]];
float2 varScreenTexturePos [[user(locn5)]];
float varViewSpaceDepth [[user(locn6)]];
float2 varShadowTex [[user(locn7)]];
int varStereoViewID [[user(locn8)]];
float varClipDistance [[user(locn9)]];
float4 gl_Position [[position]];
};
struct main_vert_in
{
float4 position [[attribute(0)]];
float3 normal [[attribute(1)]];
float4 tangent [[attribute(2)]];
float2 texture0 [[attribute(3)]];
float2 texture1 [[attribute(4)]];
float4 boneData [[attribute(5)]];
float3 blendShape0Pos [[attribute(6)]];
float3 blendShape1Pos [[attribute(7)]];
float3 blendShape2Pos [[attribute(8)]];
float3 blendShape3Pos [[attribute(9)]];
float3 blendShape4Pos [[attribute(10)]];
float3 blendShape5Pos [[attribute(11)]];
float3 blendShape0Normal [[attribute(12)]];
float3 blendShape1Normal [[attribute(13)]];
float3 blendShape2Normal [[attribute(14)]];
float3 positionNext [[attribute(15)]];
float3 positionPrevious [[attribute(16)]];
float4 strandProperties [[attribute(17)]];
};
vertex main_vert_out main_vert(main_vert_in in [[stage_in]],constant sc_Set0& sc_set0 [[buffer(0)]],uint gl_InstanceIndex [[instance_id]])
{
main_vert_out out={};
sc_Vertex_t l9_0;
l9_0.position=in.position;
l9_0.normal=in.normal;
l9_0.tangent=in.tangent.xyz;
l9_0.texture0=in.texture0;
l9_0.texture1=in.texture1;
sc_Vertex_t l9_1=l9_0;
sc_Vertex_t v=l9_1;
float4 param=float4((v.texture0*2.0)-float2(1.0),1.0,1.0);
if (sc_ShaderCacheConstant_tmp!=0)
{
param.x+=((*sc_set0.UserUniforms).sc_UniformConstants.x*float(sc_ShaderCacheConstant_tmp));
}
if (sc_StereoRenderingMode_tmp>0)
{
out.varStereoViewID=gl_InstanceIndex%2;
}
float4 l9_2=param;
if (sc_StereoRenderingMode_tmp==1)
{
float l9_3=dot(l9_2,(*sc_set0.UserUniforms).sc_StereoClipPlanes[gl_InstanceIndex%2]);
float l9_4=l9_3;
if (sc_StereoRendering_IsClipDistanceEnabled_tmp==1)
{
}
else
{
out.varClipDistance=l9_4;
}
}
float4 l9_5=float4(param.x,-param.y,(param.z*0.5)+(param.w*0.5),param.w);
out.gl_Position=l9_5;
out.varPackedTex=float4(v.texture0.x,v.texture0.y,out.varPackedTex.z,out.varPackedTex.w);
return out;
}
} // VERTEX SHADER


namespace SNAP_FS {
struct sc_PointLight_t
{
int falloffEnabled;
float falloffEndDistance;
float negRcpFalloffEndDistance4;
float angleScale;
float angleOffset;
float3 direction;
float3 position;
float4 color;
};
struct sc_DirectionalLight_t
{
float3 direction;
float4 color;
};
struct sc_AmbientLight_t
{
float3 color;
float intensity;
};
struct sc_SphericalGaussianLight_t
{
float3 color;
float sharpness;
float3 axis;
};
struct sc_LightEstimationData_t
{
sc_SphericalGaussianLight_t sg[12];
float3 ambientLight;
};
struct sc_Camera_t
{
float3 position;
float aspect;
float2 clipPlanes;
};
struct userUniformsObj
{
sc_PointLight_t sc_PointLights[3];
sc_DirectionalLight_t sc_DirectionalLights[5];
sc_AmbientLight_t sc_AmbientLights[3];
sc_LightEstimationData_t sc_LightEstimationData;
float4 sc_EnvmapDiffuseSize;
float4 sc_EnvmapDiffuseDims;
float4 sc_EnvmapDiffuseView;
float4 sc_EnvmapSpecularSize;
float4 sc_EnvmapSpecularDims;
float4 sc_EnvmapSpecularView;
float3 sc_EnvmapRotation;
float sc_EnvmapExposure;
float3 sc_Sh[9];
float sc_ShIntensity;
float4 sc_Time;
float4 sc_UniformConstants;
float4 sc_GeometryInfo;
float4x4 sc_ModelViewProjectionMatrixArray[2];
float4x4 sc_ModelViewProjectionMatrixInverseArray[2];
float4x4 sc_ViewProjectionMatrixArray[2];
float4x4 sc_ViewProjectionMatrixInverseArray[2];
float4x4 sc_ModelViewMatrixArray[2];
float4x4 sc_ModelViewMatrixInverseArray[2];
float3x3 sc_ViewNormalMatrixArray[2];
float3x3 sc_ViewNormalMatrixInverseArray[2];
float4x4 sc_ProjectionMatrixArray[2];
float4x4 sc_ProjectionMatrixInverseArray[2];
float4x4 sc_ViewMatrixArray[2];
float4x4 sc_ViewMatrixInverseArray[2];
float4x4 sc_PrevFrameViewProjectionMatrixArray[2];
float4x4 sc_ModelMatrix;
float4x4 sc_ModelMatrixInverse;
float3x3 sc_NormalMatrix;
float3x3 sc_NormalMatrixInverse;
float4x4 sc_PrevFrameModelMatrix;
float4x4 sc_PrevFrameModelMatrixInverse;
float3 sc_LocalAabbMin;
float3 sc_LocalAabbMax;
float3 sc_WorldAabbMin;
float3 sc_WorldAabbMax;
float4 sc_WindowToViewportTransform;
float4 sc_CurrentRenderTargetDims;
sc_Camera_t sc_Camera;
float sc_ShadowDensity;
float4 sc_ShadowColor;
float4x4 sc_ProjectorMatrix;
float _sc_GetFramebufferColorInvalidUsageMarker;
float shaderComplexityValue;
float sc_DisableFrustumCullingMarker;
float4 weights0;
float4 weights1;
float4 weights2;
float4 sc_StereoClipPlanes[2];
int sc_FallbackInstanceID;
float _sc_framebufferFetchMarker;
float2 sc_TAAJitterOffset;
float strandWidth;
float strandTaper;
float4 sc_StrandDataMapTextureSize;
float clumpInstanceCount;
float clumpRadius;
float clumpTipScale;
float hairstyleInstanceCount;
float hairstyleNoise;
float4 sc_ScreenTextureSize;
float4 sc_ScreenTextureDims;
float4 sc_ScreenTextureView;
float4 renderTarget0Size;
float4 renderTarget0Dims;
float4 renderTarget0View;
float4 renderTarget1Size;
float4 renderTarget1Dims;
float4 renderTarget1View;
float4 renderTarget2Size;
float4 renderTarget2Dims;
float4 renderTarget2View;
float4 renderTarget3Size;
float4 renderTarget3Dims;
float4 renderTarget3View;
};
struct sc_Bone_t
{
float4 boneMatrix[3];
float4 normalMatrix[3];
};
struct sc_Bones_obj
{
sc_Bone_t sc_Bones[1];
};
struct sc_Set0
{
constant sc_Bones_obj* sc_BonesUBO [[id(0)]];
texture2d<float> renderTarget0 [[id(1)]];
texture2d<float> renderTarget1 [[id(2)]];
texture2d<float> renderTarget2 [[id(3)]];
texture2d<float> renderTarget3 [[id(4)]];
sampler renderTarget0SmpSC [[id(11)]];
sampler renderTarget1SmpSC [[id(12)]];
sampler renderTarget2SmpSC [[id(13)]];
sampler renderTarget3SmpSC [[id(14)]];
constant userUniformsObj* UserUniforms [[id(21)]];
};
struct main_frag_out
{
float4 FragColor0 [[color(0)]];
float4 FragColor1 [[color(1)]];
float4 FragColor2 [[color(2)]];
float4 FragColor3 [[color(3)]];
};
struct main_frag_in
{
float3 varPos [[user(locn0)]];
float3 varNormal [[user(locn1)]];
float4 varTangent [[user(locn2)]];
float4 varPackedTex [[user(locn3)]];
float4 varScreenPos [[user(locn4)]];
float2 varScreenTexturePos [[user(locn5)]];
float varViewSpaceDepth [[user(locn6)]];
float2 varShadowTex [[user(locn7)]];
int varStereoViewID [[user(locn8)]];
float varClipDistance [[user(locn9)]];
};
fragment main_frag_out main_frag(main_frag_in in [[stage_in]],constant sc_Set0& sc_set0 [[buffer(0)]])
{
main_frag_out out={};
if ((sc_StereoRenderingMode_tmp==1)&&(sc_StereoRendering_IsClipDistanceEnabled_tmp==0))
{
if (in.varClipDistance<0.0)
{
discard_fragment();
}
}
float2 uv=in.varPackedTex.xy;
float2 param=uv;
int l9_0=0;
if ((int(renderTarget0HasSwappedViews_tmp)!=0))
{
int l9_1=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_1=0;
}
else
{
l9_1=in.varStereoViewID;
}
int l9_2=l9_1;
l9_0=1-l9_2;
}
else
{
int l9_3=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_3=0;
}
else
{
l9_3=in.varStereoViewID;
}
int l9_4=l9_3;
l9_0=l9_4;
}
int l9_5=l9_0;
float2 l9_6=param;
int l9_7=l9_5;
float2 l9_8=l9_6;
int l9_9=l9_7;
float l9_10=0.0;
float4 l9_11=float4(0.0);
float2 l9_12=l9_8;
int l9_13=renderTarget0Layout_tmp;
int l9_14=l9_9;
float l9_15=l9_10;
float2 l9_16=l9_12;
int l9_17=l9_13;
int l9_18=l9_14;
float3 l9_19=float3(0.0);
if (l9_17==0)
{
l9_19=float3(l9_16,0.0);
}
else
{
if (l9_17==1)
{
l9_19=float3(l9_16.x,(l9_16.y*0.5)+(0.5-(float(l9_18)*0.5)),0.0);
}
else
{
l9_19=float3(l9_16,float(l9_18));
}
}
float3 l9_20=l9_19;
float3 l9_21=l9_20;
float2 l9_22=l9_21.xy;
float l9_23=l9_15;
float4 l9_24=sc_set0.renderTarget0.sample(sc_set0.renderTarget0SmpSC,l9_22,bias(l9_23));
float4 l9_25=l9_24;
l9_11=l9_25;
float4 l9_26=l9_11;
float4 l9_27=l9_26;
float4 l9_28=l9_27;
float4 renderTarget0Sample=l9_28;
float2 param_1=uv;
int l9_29=0;
if ((int(renderTarget1HasSwappedViews_tmp)!=0))
{
int l9_30=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_30=0;
}
else
{
l9_30=in.varStereoViewID;
}
int l9_31=l9_30;
l9_29=1-l9_31;
}
else
{
int l9_32=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_32=0;
}
else
{
l9_32=in.varStereoViewID;
}
int l9_33=l9_32;
l9_29=l9_33;
}
int l9_34=l9_29;
float2 l9_35=param_1;
int l9_36=l9_34;
float2 l9_37=l9_35;
int l9_38=l9_36;
float l9_39=0.0;
float4 l9_40=float4(0.0);
float2 l9_41=l9_37;
int l9_42=renderTarget1Layout_tmp;
int l9_43=l9_38;
float l9_44=l9_39;
float2 l9_45=l9_41;
int l9_46=l9_42;
int l9_47=l9_43;
float3 l9_48=float3(0.0);
if (l9_46==0)
{
l9_48=float3(l9_45,0.0);
}
else
{
if (l9_46==1)
{
l9_48=float3(l9_45.x,(l9_45.y*0.5)+(0.5-(float(l9_47)*0.5)),0.0);
}
else
{
l9_48=float3(l9_45,float(l9_47));
}
}
float3 l9_49=l9_48;
float3 l9_50=l9_49;
float2 l9_51=l9_50.xy;
float l9_52=l9_44;
float4 l9_53=sc_set0.renderTarget1.sample(sc_set0.renderTarget1SmpSC,l9_51,bias(l9_52));
float4 l9_54=l9_53;
l9_40=l9_54;
float4 l9_55=l9_40;
float4 l9_56=l9_55;
float4 l9_57=l9_56;
float4 renderTarget1Sample=l9_57;
float2 param_2=uv;
int l9_58=0;
if ((int(renderTarget2HasSwappedViews_tmp)!=0))
{
int l9_59=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_59=0;
}
else
{
l9_59=in.varStereoViewID;
}
int l9_60=l9_59;
l9_58=1-l9_60;
}
else
{
int l9_61=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_61=0;
}
else
{
l9_61=in.varStereoViewID;
}
int l9_62=l9_61;
l9_58=l9_62;
}
int l9_63=l9_58;
float2 l9_64=param_2;
int l9_65=l9_63;
float2 l9_66=l9_64;
int l9_67=l9_65;
float l9_68=0.0;
float4 l9_69=float4(0.0);
float2 l9_70=l9_66;
int l9_71=renderTarget2Layout_tmp;
int l9_72=l9_67;
float l9_73=l9_68;
float2 l9_74=l9_70;
int l9_75=l9_71;
int l9_76=l9_72;
float3 l9_77=float3(0.0);
if (l9_75==0)
{
l9_77=float3(l9_74,0.0);
}
else
{
if (l9_75==1)
{
l9_77=float3(l9_74.x,(l9_74.y*0.5)+(0.5-(float(l9_76)*0.5)),0.0);
}
else
{
l9_77=float3(l9_74,float(l9_76));
}
}
float3 l9_78=l9_77;
float3 l9_79=l9_78;
float2 l9_80=l9_79.xy;
float l9_81=l9_73;
float4 l9_82=sc_set0.renderTarget2.sample(sc_set0.renderTarget2SmpSC,l9_80,bias(l9_81));
float4 l9_83=l9_82;
l9_69=l9_83;
float4 l9_84=l9_69;
float4 l9_85=l9_84;
float4 l9_86=l9_85;
float4 renderTarget2Sample=l9_86;
float2 param_3=uv;
int l9_87=0;
if ((int(renderTarget3HasSwappedViews_tmp)!=0))
{
int l9_88=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_88=0;
}
else
{
l9_88=in.varStereoViewID;
}
int l9_89=l9_88;
l9_87=1-l9_89;
}
else
{
int l9_90=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_90=0;
}
else
{
l9_90=in.varStereoViewID;
}
int l9_91=l9_90;
l9_87=l9_91;
}
int l9_92=l9_87;
float2 l9_93=param_3;
int l9_94=l9_92;
float2 l9_95=l9_93;
int l9_96=l9_94;
float l9_97=0.0;
float4 l9_98=float4(0.0);
float2 l9_99=l9_95;
int l9_100=renderTarget3Layout_tmp;
int l9_101=l9_96;
float l9_102=l9_97;
float2 l9_103=l9_99;
int l9_104=l9_100;
int l9_105=l9_101;
float3 l9_106=float3(0.0);
if (l9_104==0)
{
l9_106=float3(l9_103,0.0);
}
else
{
if (l9_104==1)
{
l9_106=float3(l9_103.x,(l9_103.y*0.5)+(0.5-(float(l9_105)*0.5)),0.0);
}
else
{
l9_106=float3(l9_103,float(l9_105));
}
}
float3 l9_107=l9_106;
float3 l9_108=l9_107;
float2 l9_109=l9_108.xy;
float l9_110=l9_102;
float4 l9_111=sc_set0.renderTarget3.sample(sc_set0.renderTarget3SmpSC,l9_109,bias(l9_110));
float4 l9_112=l9_111;
l9_98=l9_112;
float4 l9_113=l9_98;
float4 l9_114=l9_113;
float4 l9_115=l9_114;
float4 renderTarget3Sample=l9_115;
if (dot(((renderTarget0Sample+renderTarget1Sample)+renderTarget2Sample)+renderTarget3Sample,float4(0.23454))==0.34231836)
{
discard_fragment();
}
float4 param_4=renderTarget0Sample;
if (sc_ShaderCacheConstant_tmp!=0)
{
param_4.x+=((*sc_set0.UserUniforms).sc_UniformConstants.x*float(sc_ShaderCacheConstant_tmp));
}
out.FragColor0=param_4;
float4 param_5=renderTarget1Sample;
out.FragColor1=param_5;
float4 param_6=renderTarget2Sample;
out.FragColor2=param_6;
float4 param_7=renderTarget3Sample;
out.FragColor3=param_7;
return out;
}
} // FRAGMENT SHADER
