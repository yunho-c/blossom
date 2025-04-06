// NOTE: temporarily using old version without refactoring due to compilation errors.
//       ideally, import types from `FetchBlossomData.ts` instead of redundant definition

// import Event from "./Events";
// import Event from "Scripts/Events";

// import { FetchData } from "./FetchData"; // ORIG
import { FetchBlossomData, SampleDataResponse, SimilarityResponse } from "./FetchBlossomData";
import { IdeaGenerator } from "./IdeaGenerator";

// NOTE: maybe turn stuff into types/interfaces to help organize.

@component
export class DataStore extends BaseScriptComponent {
  // DATA
  items: Promise<string[]>;
  similarities: Promise<SimilarityResponse>;

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
  }

  // functions to be triggered via buttons

  public async getSampleFruitData() {
    this.items = this.fetchBlossomData.getSampleData("fruits");
    const items = await this.items;
    this.debugDataString.text = items.filter(s => s).join(', ');
    print(this.debugDataString); // DEBUG
  }

  public async getSampleCarData() {
    this.items = this.fetchBlossomData.getSampleData("cars");
    const items = await this.items;
    this.debugDataString.text = items.filter(s => s).join(', ');
    print(this.debugDataString); // DEBUG
  }

  public async calculateSimilarity() {
    const items = await this.items;
    this.similarities = this.fetchBlossomData.calculateSimilarity(items);
    const similarityResponse = await this.similarities;
    this.debugSimiString.text = similarityResponse.similarity_matrix.join(', ');
    print(this.debugSimiString); // DEBUG
}

  public async spawnIdeas() {
    const items = await this.items;
    for (var item of items) {
      this.ideaGenerator.spawnIdea(item, "evidence")
    }
  }
}
