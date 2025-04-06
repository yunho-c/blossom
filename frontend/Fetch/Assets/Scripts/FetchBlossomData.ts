import Event from "Scripts/Events";

interface SampleDataResponse {
  items: string[];
}

interface SimilarityRequest {
  items: string[];
}

interface SimilarityResponse {
  items: string[];
  similarity_matrix: number[][];
}

@component
export class FetchBlossomData extends BaseScriptComponent {
  private remoteService: RemoteServiceModule = require("LensStudio:RemoteServiceModule");

  private baseUrl = "https://blossom.yunhocho.com";

  sampleDataReceived: Event<string[]>;
  similarityReceived: Event<SimilarityResponse>;

  onAwake() {
    this.sampleDataReceived = new Event<string[]>();
    this.similarityReceived = new Event<SimilarityResponse>();
  }

  // public getSampleData(name: string) {
  public getSampleData() {
    this.remoteService
      // .fetch(`${this.baseUrl}/sample_data?name=${name}`, {
      .fetch(`${this.baseUrl}/sample_data?name=example`, {
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
