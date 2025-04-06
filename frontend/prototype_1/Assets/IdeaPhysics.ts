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
              stringToColor

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
                  const material = mesh.mainMaterial.clone(); // Optional: clone if you don't want to affect others
                  const randomColor = d3SchemeCategory10[Math.floor(Math.random() * 10)];
                  material.mainPass.baseColor = new vec4(randomColor[0]/255, randomColor[1]/255, randomColor[2]/255, 1);
                  mesh.mainMaterial = material;
              }
          }
      }
  }

    onAwake() {
        this.init();
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
      let xPos = Math.random() * X_RANGE - (X_RANGE/2);
      let yPos = Math.random() * Y_RANGE - (Y_RANGE/2);
      let zPos = Math.random() * Z_RANGE - (Z_RANGE/2);

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
          "Mazda MX-5 Miata",
          "Volvo 240",
          "Citroen DS",
          "Renault 5",
          "Peugeot 205 GTi",
          "Fiat 500",
          "Alfa Romeo Giulia",
          "Cadillac Eldorado",
          "Buick Riviera",
          "Chevrolet Impala",
          "Dodge Ram",
          "Toyota Land Cruiser",
          "Jeep Cherokee",
          "Honda Accord",
          "Acura NSX",
          "BMW M3",
          "Audi A4",
          "Lexus LS400",
          "Kia Telluride",
          "Hyundai Sonata",
          "Volkswagen Golf GTI",
          "Ford F-150",
          "Chevrolet Camaro",
          "Pontiac GTO",
          "Datsun 240Z",
          "Mercedes-Benz 300SL Gullwing",
          "Ferrari F40",
          "Lamborghini Countach",
          "Bugatti Veyron",
          "McLaren F1",
          "Aston Martin DB5",
          "Rolls-Royce Phantom",
          "Tesla Model 3",
          "Lucid Air",
          "Rivian R1T",
          "Toyota Prius",
          "BMW i3",
          "Nissan Leaf",
          "Honda Insight",
          "Hummer H1",
          "GMC Yukon",
          "Ford Bronco",
          "Subaru WRX",
          "Mitsubishi Lancer Evolution",
          "Mercedes G-Class",
          "Chrysler 300",
          "Saab 900",
          "Lincoln Continental",
          "Oldsmobile 442",
          "Studebaker Avanti",
          "DeLorean DMC-12",
          "Plymouth Barracuda",
          "AMC Gremlin",
          "Mazda RX-7",
          "Toyota Supra",
          "Lexus RX",
          "Infiniti Q45",
          "Dodge Viper",
          "BMW 7 Series",
          "Jaguar E-Type",
          "Volkswagen Bus (Type 2)",
          "Chevrolet Tahoe",
          "Nissan 350Z",
          "Hyundai Elantra",
          "Peugeot 504",
          "Fiat Panda",
          "Opel Kadett",
          "Skoda Octavia",
          "Renault Clio",
          "Ford Focus",
          "Honda CR-V",
          "Toyota RAV4",
          "Mitsubishi Pajero",
          "Suzuki Jimny",
          "Chevrolet Bolt EV",
          "Ford Explorer",
          "Cadillac Escalade",
          "Audi R8",
          "Ferrari 458 Italia",
          "Lamborghini Huracan",
          "Koenigsegg Jesko"
      ];

    private weights: number[][] = [
    [
      1.000000238418579,
      0.4140651822090149,
      0.6592483520507812,
      0.5094653367996216,
      0.6171855330467224,
      0.49724820256233215
    ],
    [
      0.4140651822090149,
      0.9999998807907104,
      0.3806169033050537,
      0.44238805770874023,
      0.38415607810020447,
      0.44372376799583435
    ],
    [
      0.6592483520507812,
      0.3806169033050537,
      0.9999997615814209,
      0.6223424673080444,
      0.5614188313484192,
      0.5190407037734985
    ],
    [
      0.5094653367996216,
      0.44238805770874023,
      0.6223424673080444,
      1.0000001192092896,
      0.5174458622932434,
      0.6165656447410583
    ],
    [
      0.6171855330467224,
      0.38415607810020447,
      0.5614188313484192,
      0.5174458622932434,
      1,
      0.4807377755641937
    ],
    [
      0.49724820256233215,
      0.44372376799583435,
      0.5190407037734985,
      0.6165656447410583,
      0.4807377755641937,
      0.9999998807907104
    ]
    ];

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
            const forceMagnitude = this.weights[i][j]; // Example force value
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
