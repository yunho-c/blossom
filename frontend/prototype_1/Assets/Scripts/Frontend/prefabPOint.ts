import { Interactable } from "SpectaclesInteractionKit/Components/Interaction/Interactable/Interactable"

@component
export class WindowButton extends BaseScriptComponent {
  @input("SceneObject")
  @hint("The UI window to show/hide when button is pressed")
  window: SceneObject | undefined
  
  private interactable: Interactable | null = null

  onAwake() {
    this.interactable = this.getSceneObject().getComponent(
      Interactable.getTypeName(),
    )

    this.createEvent("OnStartEvent").bind(() => {
      if (!this.interactable) {
        throw new Error(
          "Window Button requires an Interactable Component on the same Scene object in order to work - please ensure one is added.",
        )
      }
      this.interactable.onTriggerEnd.add(() => {
        if (this.enabled && this.window) {
          this.window.enabled = !this.window.enabled;
        }
      })
    })
  }
}