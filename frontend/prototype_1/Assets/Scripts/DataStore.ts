// NOTE: temporarily using old version without refactoring due to compilation errors.
//       ideally, import types from `FetchBlossomData.ts` instead of redundant definition

// import Event from "./Events";
// import Event from "Scripts/Events";

// import { FetchData } from "./FetchData"; // ORIG
import { FetchBlossomData } from "./FetchBlossomData";
import { IdeaGenerator } from "./IdeaGenerator";

// NOTE: maybe turn stuff into types/interfaces to help organize.

@component
export class DataStore extends BaseScriptComponent {
  // DATA
  items: string[];
  similarities: number[][];

  // sources & interactors
  @input
  // fetchData: FetchData; // Component to fetch blossom data // ORIG
  fetchBlossomData: FetchBlossomData; // Component to fetch blossom data

  @input
  ideaGenerator: IdeaGenerator; // Component to fetch blossom data

  @input
  debugDataString: Text;

  @input
  debugSimiString: Text;

  onAwake() {
    // print(this.fetchData); // ORIG
    // print(this.fetchData.similarityReceived);
    // this.fetchData.sampleDataReceived.add((args) => {
    // print(this.fetchBlossomData);
    // print(this.fetchBlossomData.similarityReceived);
    // print("DataStore: awake"); // DEBUG
    this.fetchBlossomData.sampleDataReceived.add((args) => {
      // print("sampleDataReceived event triggered"); // DEBUG
      // this.items = args.items; // ORIG
      // this.debugDataString.text = args.items.filter(s => s).join(', ');
      this.items = args;
      this.debugDataString.text = args.filter(s => s).join(', ');
      print(this.debugDataString); // DEBUG
    });

    this.fetchBlossomData.similarityReceived.add((args) => {
      // print("similarityReceived event triggered"); // DEBUG
      this.similarities = args.similarity_matrix;
      this.debugSimiString.text = args.similarity_matrix.join(', ');
      print(this.debugSimiString); // DEBUG
    });
  }

  // functions to be triggered via buttons

  public getSampleFruitData() {
    this.fetchBlossomData.getSampleData("fruits")
  }

  public getSampleCarData() {
    this.fetchBlossomData.getSampleData("cars")
  }

  public calculateSimilarity() {
    this.fetchBlossomData.calculateSimilarity(this.items)
  }

  public spawnIdeas() {
    for (var item of this.items) {
      this.ideaGenerator.spawnIdea(item, "evidence")
    }
  }
}
