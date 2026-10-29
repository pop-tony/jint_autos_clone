# Vehicle showroom models

Add one optimized GLB file per vehicle to this folder to enable the interactive 360° viewer on that vehicle's detail page. The viewer supports mouse drag and touch gestures for rotation, plus scroll or pinch for zoom.

Use these exact filenames:

| Vehicle | GLB filename |
|---|---|
| Lexus SUV | `lexus-suv.glb` |
| Toyota Pickup | `toyota-pickup.glb` |
| Toyota Van | `toyota-van.glb` |
| Mercedes-Benz SUV | `mercedes-benz-suv.glb` |
| RAM Pickup | `ram-pickup.glb` |
| Mercedes-Benz Sedan | `mercedes-benz-sedan.glb` |
| Chevrolet Corvette | `chevrolet-corvette.glb` |
| Performance Sedan | `performance-sedan.glb` |

Each filename corresponds to the vehicle ID and model path configured in `client/src/data/cars.js`. For vehicles added through the prototype admin page, use the generated vehicle ID as the GLB filename (for example, `<vehicle-id>.glb`).

No model files are included yet. The showroom gracefully displays the vehicle photo and a pending-model message until a matching GLB file is present.
