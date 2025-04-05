import { Interactable } from "SpectaclesInteractionKit/Components/Interaction/Interactable/Interactable";
import { InteractorEvent } from "SpectaclesInteractionKit/Core/Interactor/InteractorEvent";
import { SIK } from "SpectaclesInteractionKit/SIK";


@component
export class VisionOpenAI extends BaseScriptComponent {
  @input textInput: Text;
  @input image: Image;
  @input interactable: Interactable;


  apiKey: string = "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";

  // Remote service module for fetching data
  private remoteServiceModule: RemoteServiceModule = require("LensStudio:RemoteServiceModule");

  private isProcessing: boolean = false;

  onAwake() {
    this.createEvent("OnStartEvent").bind(() => {
      this.onStart();
    });
  }

  onStart() {
    let interactionManager = SIK.InteractionManager;

    // Define the desired callback logic for the relevant Interactable event.
    let onTriggerEndCallback = (event: InteractorEvent) => {
      this.handleTriggerEnd(event);
    };

    this.interactable.onInteractorTriggerEnd(onTriggerEndCallback);
  }

  async handleTriggerEnd(eventData) {
    if (this.isProcessing) {
      print("A request is already in progress. Please wait.");
      return;
    }

    if (!this.textInput.text) {
      print("Text, Image, or API key input is missing");
      return;
    }

    try {
      this.isProcessing = true;

      // Access the texture from the image component
  }

  // More about encodeTextureToBase64: https://platform.openai.com/docs/guides/vision or https://developers.snap.com/api/lens-studio/Classes/OtherClasses#Base64

}
