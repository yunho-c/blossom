@component
export class NewScript extends BaseScriptComponent {

  // public balls: SceneObject;
    @input
    private stormObject: SceneObject;

    private subSceneObjects: SceneObject[] = [];

    @input
    public ballPrefab: ObjectPrefab;

    @input
    public textPrefab: ObjectPrefab;

    private remoteService: RemoteServiceModule = require("LensStudio:RemoteServiceModule");

    // private init() {
    //     const rootObject = this.getSceneObject();
    //     if (rootObject) {
    //         for (let item of this.items) {
    //             let object = this.spawnIdea(item, "evidence");
    //             this.subSceneObjects.push(object);
    //             let text = this.textPrefab.instantiate(object);
    //             // text.name = item; // ?
    //             text.name = "abc"; // ?
    //             // var text3DComponent = object.getComponent("Component.Text3D");
    //             var text3DComponent = object.getComponent("Text");
    //             text3DComponent.text = "New Text";
    //         }
    //     }
    // }
    private init() {
      const rootObject = this.getSceneObject();
      if (rootObject) {
          for (let item of this.items) {
              let object = this.spawnIdea(item, "evidence");
              this.subSceneObjects.push(object);

              let textObject = this.textPrefab.instantiate(object); // attach to `object`
              textObject.name = item; // or "abc"

              let textComponent = textObject.getComponent("Text"); // Get from `textObject`, not `object`
              if (textComponent) {
                  textComponent.text = item; // Or whatever text you want
                  // print(textComponent) // DEBUG
              }

              const mesh = object.getComponent("Component.MeshVisual");
              if (mesh) {
                  print("There is mesh!")
                  const originalMaterial = mesh.mainMaterial;
                  const material = originalMaterial.clone();
                  print(`Material cloned (original != clone): ${originalMaterial !== material}`);

                  // Use stringToColor to get unique color per item
                  const colorStr = stringToColor(item);
                  const rgb = colorStr.match(/\d+/g);
                  const uniqueColor = new vec4(
                      // 0,
                      // 0,
                      // 0,
                      parseInt(rgb[0])/255,
                      parseInt(rgb[1])/255,
                      parseInt(rgb[2])/255,
                      1
                  );

                  material.mainPass.baseColor = uniqueColor;
                  mesh.mainMaterial = material;
                  print(`Set unique color for ${item}: ${colorStr}`);

                  // For PBR specifically:
                  if (material.getPass(0)) {
                      material.getPass(0).baseColor = uniqueColor;
                  }
            }
          }
      }
  }

    async onAwake() {
        this.init();
        this.weights = (await this.calculateSimilarity(this.items)).similarity_matrix;
        this.createEvent("UpdateEvent").bind(this.update.bind(this));
    }

    public spawnIdea(name: string, type: string) {
      let newball = this.ballPrefab.instantiate(this.getSceneObject());
      newball.getTransform().setWorldPosition(this.generateRandomPosition());

      // newball.
      return newball
    }

    generateRandomPosition() {
      const X_RANGE = 100;
      const Y_RANGE = 100;
      const Z_RANGE = 100;
      const X_OFFSET = 0;
      const Y_OFFSET = 0;
      const Z_OFFSET = -50;
      let xPos = Math.random() * X_RANGE - (X_RANGE/2) + X_OFFSET;
      let yPos = Math.random() * Y_RANGE - (Y_RANGE/2) + Y_OFFSET;
      let zPos = Math.random() * Z_RANGE - (Z_RANGE/2) + Z_OFFSET;

      return new vec3(xPos, yPos, zPos);
    }

    // private items: string[] = [
    //     "apple",
    //     "fuji",
    //     "orange",
    //     "mandarin",
    //     "banana",
    //     "plantain"
    // ];
      private items: string[] = [
          "Ford Model T",
          "Volkswagen Beetle",
          "Toyota Corolla",
          "Honda Civic",
          "Ford Mustang",
          "Chevrolet Corvette",
          "Porsche 911",
          "BMW 3 Series",
          "Mercedes-Benz S-Class",
          "Tesla Model S",
          "Toyota Camry",
          "Chevrolet Suburban",
          "Jeep Wrangler",
          "Land Rover Defender",
          "Mini Cooper",
          "Audi Quattro",
          "Nissan GT-R",
          "Dodge Charger",
          "Subaru Outback",
          // "Mazda MX-5 Miata",
          // "Volvo 240",
          // "Citroen DS",
          // "Renault 5",
          // "Peugeot 205 GTi",
          // "Fiat 500",
          // "Alfa Romeo Giulia",
          // "Cadillac Eldorado",
          // "Buick Riviera",
          // "Chevrolet Impala",
          // "Dodge Ram",
          // "Toyota Land Cruiser",
          // "Jeep Cherokee",
          // "Honda Accord",
          // "Acura NSX",
          // "BMW M3",
          // "Audi A4",
          // "Lexus LS400",
          // "Kia Telluride",
          // "Hyundai Sonata",
          // "Volkswagen Golf GTI",
          // "Ford F-150",
          // "Chevrolet Camaro",
          // "Pontiac GTO",
          // "Datsun 240Z",
          // "Mercedes-Benz 300SL Gullwing",
          // "Ferrari F40",
          // "Lamborghini Countach",
          // "Bugatti Veyron",
          "McLaren F1",
          // "Aston Martin DB5",
          // "Rolls-Royce Phantom",
          // "Tesla Model 3",
          // "Lucid Air",
          // "Rivian R1T",
          // "Toyota Prius",
          // "BMW i3",
          // "Nissan Leaf",
          // "Honda Insight",
          // "Hummer H1",
          // "GMC Yukon",
          // "Ford Bronco",
          // "Subaru WRX",
          // "Mitsubishi Lancer Evolution",
          // "Mercedes G-Class",
          // "Chrysler 300",
          // "Saab 900",
          // "Lincoln Continental",
          // "Oldsmobile 442",
          // "Studebaker Avanti",
          // "DeLorean DMC-12",
          // "Plymouth Barracuda",
          // "AMC Gremlin",
          // "Mazda RX-7",
          // "Toyota Supra",
          // "Lexus RX",
          // "Infiniti Q45",
          // "Dodge Viper",
          // "BMW 7 Series",
          // "Jaguar E-Type",
          // "Volkswagen Bus (Type 2)",
          // "Chevrolet Tahoe",
          // "Nissan 350Z",
          // "Hyundai Elantra",
          // "Peugeot 504",
          // "Fiat Panda",
          // "Opel Kadett",
          // "Skoda Octavia",
          // "Renault Clio",
          // "Ford Focus",
          // "Honda CR-V",
          // "Toyota RAV4",
          // "Mitsubishi Pajero",
          // "Suzuki Jimny",
          // "Chevrolet Bolt EV",
          // "Ford Explorer",
          // "Cadillac Escalade",
          // "Audi R8",
          // "Ferrari 458 Italia",
          // "Lamborghini Huracan",
          // "Koenigsegg Jesko"
      ];

      private weights: number[][] | null = null // Note: This is actually the similarity matrix from calculateSimilarity response

    private update() {
        const stormPosition = this.stormObject.getTransform().getWorldPosition();

        for (let i = 0; i < this.subSceneObjects.length; i++) {
            const currentObject = this.subSceneObjects[i];
            const currentPosition = currentObject.getTransform().getWorldPosition();

            let totalForce = vec3.zero();

            for (let j = 0; j < this.subSceneObjects.length; j++) {
            if (i === j) continue;

            const otherObject = this.subSceneObjects[j];
            const otherPosition = otherObject.getTransform().getWorldPosition();

            // Calculate direction vector from current object to the other object
            const directionVector = otherPosition.sub(currentPosition);
            const distance = directionVector.length;
            const direction = directionVector.normalize();

            // Add a force in the direction of the other object (adjust the magnitude as needed)
            const forceMagnitude = this.weights ? this.weights[i][j] : 0; // Example force value
            const spring_scale = 10;
            const force = direction.uniformScale(forceMagnitude * spring_scale);

            // // Add a damping term to reduce oscillations or excessive movement
            // const dampingFactor = 0.1; // Adjust the damping factor as needed
            // const velocity = currentObject.getComponent("Physics.BodyComponent").velocity
            // const dampingForce = velocity.uniformScale(-dampingFactor);

            const storm_scale = 0.1;
            // Add a center force to the current object
            const centerForce = stormPosition.sub(currentPosition).normalize().uniformScale(storm_scale);
            totalForce = totalForce.add(centerForce);


            // calculate
            const a = 0.001
            const b = 50
            const k = 5000


            const chargeScale = - 1/(distance**2) * k
            const chargeForce = direction.uniformScale(chargeScale)

            const holdDistance = 20
            const holdScale = 1/((distance)**2) * k

            // print("chargeForce: " + chargeForce.length.toString()); // DEBUG
            const forceDifference = chargeForce.sub(force).length;
            // print(`${forceDifference.toString()}`); // DEBUG

            totalForce = totalForce.add(chargeForce)

            // Add the damping force to the total force
            // totalForce = totalForce.add(dampingForce);

            totalForce = totalForce.add(force);

            // Store the total force for the current object
            currentObject.getComponent("Physics.BodyComponent").addForce(totalForce, Physics.ForceMode.Force);
        }}
    }

    private baseUrl = "https://blossom.yunhocho.com";

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

/**
 * Generates a consistent RGB color from a string input
 * @param input The input string to generate color from
 * @returns RGB color string in format "rgb(R, G, B)"
 */
export function stringToColor(input: string): string {
  // Simple hash function to convert string to number
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
      hash = input.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Convert hash to RGB components
  const r = (hash & 0xFF0000) >> 16;
  const g = (hash & 0x00FF00) >> 8;
  const b = hash & 0x0000FF;

  // Ensure minimum brightness
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  if (brightness < 128) {
      // If too dark, adjust by inverting the color
      return `rgb(${255 - r}, ${255 - g}, ${255 - b})`;
  }

  return `rgb(${r}, ${g}, ${b})`;
}

let d3SchemeCategory10 = [
  [31, 119, 180],
  [255, 127, 14],
  [44, 160, 44],
  [214, 39, 40],
  [148, 103, 189],
  [140, 86, 75],
  [227, 119, 194],
  [127, 127, 127],
  [188, 189, 34],
  [23, 190, 207]
];


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

