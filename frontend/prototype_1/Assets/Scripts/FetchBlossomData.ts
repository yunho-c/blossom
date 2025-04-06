export interface SampleDataResponse {
  items: string[];
}

export interface SimilarityRequest {
  items: string[];
}

export interface SimilarityResponse {
  items: string[];
  similarity_matrix: number[][];
}

@component
export class FetchBlossomData extends BaseScriptComponent {
  private remoteService: RemoteServiceModule = require("LensStudio:RemoteServiceModule");

  private baseUrl = "https://blossom.yunhocho.com";

  onAwake() {
  }

  public async getSampleData(name: string): Promise<string[]> {
    try {
      const response = await this.remoteService.fetch(`${this.baseUrl}/sample_data?name=${name}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      let sampleData = data as SampleDataResponse;
      print(sampleData.items); // DEBUG
      return sampleData.items;
    } catch (error) {
      failAsync(error);
      throw error;
    }
  }

  public async calculateSimilarity(items: string[]): Promise<SimilarityResponse> {
    try {
      const response = await this.remoteService.fetch(`${this.baseUrl}/similarity`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items }),
      });
      const data = await response.json();
      print(data); // DEBUG
      let similarityData = data as SimilarityResponse;
      print(similarityData.similarity_matrix); // DEBUG
      return similarityData;
    } catch (error) {
      failAsync(error);
      throw error;
    }
  }
}


/////////////////////////////////////////////////////////// ORIG

// import Event from "./Events";
// // import Event from "Scripts/Events";

// const BASE_URL = "https://blossom.yunhocho.com";

// interface ItemResponse {
//   items: string[];
// }

// interface SimilarityResponse {
//   items: string[];
//   similarity_matrix: number[][];
// }

// @component
// export class FetchData extends BaseScriptComponent {
//   private remoteService: RemoteServiceModule = require("LensStudio:RemoteServiceModule");

//   sampleDataReceived: Event<ItemResponse>;
//   similarityReceived: Event<SimilarityResponse>;

//   onAwake() {
//     this.sampleDataReceived = new Event<ItemResponse>();
//     this.similarityReceived = new Event<SimilarityResponse>();
//   }

//   public getSampleData(name: string) {
//     this.remoteService
//       .fetch(`${BASE_URL}/sample_data?name=${name}`, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       })
//       .then((response) => response.json())
//       .then((data) => {
//         // print(data); // DEBUG
//         let sampleData = data as ItemResponse;
//         this.sampleDataReceived.invoke(sampleData);
//       })
//       .catch(failAsync);
//   }

//   public calculateSimilarity(items: string[]) {
//     this.remoteService
//       .fetch(`${BASE_URL}/similarity`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ items }),
//       })
//       .then((response) => response.json())
//       .then((data) => {
//         // print(data); // DEBUG
//         let similarityData = data as SimilarityResponse;
//         this.similarityReceived.invoke(similarityData);
//       })
//       .catch(failAsync);
//   }
// }
