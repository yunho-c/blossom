// -----JS CODE-----
//@input int Select3dTex {"widget":"slider","min":0,"max":11,"label":"Select 3D Texture"}
//@input Asset.FileTexture3D[] Texture3D {"label":"3D Textures"}
//@input Asset.Material material3dTex {"label":"3D Texture Material"}
//@input Asset.VFXAsset vfx3dTex {"label":"3D Texture VFX"}

script.material3dTex.mainPass.tex3d = script.Texture3D[script.Select3dTex]
script.vfx3dTex.properties.tex3d = script.Texture3D[script.Select3dTex]