import Event from "./Events";

interface SampleDataResponse {
  items: string[];
}

interface SimilarityResponse {
  items: string[];
  similarity_matrix: number[][];
}

@component
export class BlossomDataManager extends BaseScriptComponent {
  // DATA
  items: string[];

  // sources & interactors
  @input
  debugDataString: Text;

  private remoteService: RemoteServiceModule = require("LensStudio:RemoteServiceModule");
  private baseUrl = "https://blossom.yunhocho.com";

  sampleDataReceived: Event<string[]>;
  similarityReceived: Event<SimilarityResponse>;

  onAwake() {
    // Initialize events
    this.sampleDataReceived = new Event<string[]>();
    this.similarityReceived = new Event<SimilarityResponse>();

    // Listen for sample data received
    this.sampleDataReceived.add((args) => {
      print("sampleDataReceived event triggered"); // DEBUG
      this.items = args;
      this.debugDataString.text = args.filter((s) => s).join(", ");
      print(this.debugDataString); // DEBUG
    });
  }

  public getSampleData(name: string) {
    this.remoteService
      .fetch(`${this.baseUrl}/sample_data?name=${name}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => response.json())
      .then((data) => {
        print(data);
        let sampleData = data as SampleDataResponse;
        this.sampleDataReceived.invoke(sampleData.items);
      })
      .catch(failAsync);
  }

  public getSampleFruitData() {
    this.getSampleData("fruits");
  }

  public getSampleCarData() {
    this.getSampleData("cars");
  }

  public calculateSimilarity(items: string[]) {
    this.remoteService
      .fetch(`${this.baseUrl}/similarity`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items }),
      })
      .then((response) => response.json())
      .then((data) => {
        let similarityData = data as SimilarityResponse;
        this.similarityReceived.invoke(similarityData);
      })
      .catch(failAsync);
  }
}