// import Event from "./Events";
// import Event from "Scripts/Events";

// import { FetchData } from "./FetchData"; // ORIG
import { FetchBlossomData } from "./FetchBlossomData";

// NOTE: maybe turn stuff into types/interfaces to help organize.

@component
export class DataStore extends BaseScriptComponent {
  // DATA
  items: string[];

  // sources & interactors
  @input
  // fetchData: FetchData; // Component to fetch blossom data // ORIG
  fetchBlossomData: FetchBlossomData; // Component to fetch blossom data

  @input
  debugDataString: Text;

  onAwake() {
    // print(this.fetchData); // ORIG
    // print(this.fetchData.similarityReceived);
    // this.fetchData.sampleDataReceived.add((args) => {
    // print(this.fetchBlossomData);
    // print(this.fetchBlossomData.similarityReceived);
    // print("DataStore: awake"); // DEBUG
    this.fetchBlossomData.sampleDataReceived.add((args) => {
      print("sampleDataReceived event triggered"); // DEBUG
      // this.items = args.items; // ORIG
      // this.debugDataString.text = args.items.filter(s => s).join(', ');
      this.items = args;
      this.debugDataString.text = args.filter(s => s).join(', ');
      print(this.debugDataString); // DEBUG
    });
  }
}
