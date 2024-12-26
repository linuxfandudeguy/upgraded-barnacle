# Bitmap Canvas API Documentation

## Overview
The Bitmap Canvas API allows users to generate bitmap images using a simple 16x16 grid format and the `canvas` library. The API converts a bitmap string into a PNG image, where each character in the bitmap string represents a specific color.

## Base10 Color Key
The following color codes are used in the bitmap string:

| Code | Color    |
|------|----------|
| 0    | Black    |
| 1    | White    |
| 2    | Red      |
| 3    | Green    |
| 4    | Blue     |
| 5    | Yellow   |
| 6    | Magenta  |
| 7    | Cyan     |
| 8    | Orange   |
| 9    | Gray     |

Each bitmap must consist of **16 lines** with **16 digits per line**, separated by hyphens (`-`).

## API Endpoint
### `GET /generate`
Generates a PNG image from a bitmap string.

#### Base URL
The API is hosted at: [https://upgraded-barnacle-rust.vercel.app/](https://upgraded-barnacle-rust.vercel.app/)

#### Query Parameters
- `bitmap` (required): A string representing the 16x16 bitmap. Each line must contain 16 digits, and the lines must be separated by `-`.

#### Example Request
```http
GET https://upgraded-barnacle-rust.vercel.app/generate?bitmap=0000000000000000-0000000000000000-0000000000000000-0000000222200000-0000002222220000-0000002277770000-0000222277770000-0000222222220000-0000222222220000-0000222222220000-0000222222220000-0000002200220000-0000002200220000-0000000000000000-0000000000000000-0000000000000000
```

#### Example Response
A PNG image is returned that visually represents the provided bitmap.

![Generated Image](https://upgraded-barnacle-rust.vercel.app/generate?bitmap=0000000000000000-0000000000000000-0000000000000000-0000000222200000-0000002222220000-0000002277770000-0000222277770000-0000222222220000-0000222222220000-0000222222220000-0000222222220000-0000002200220000-0000002200220000-0000000000000000-0000000000000000-0000000000000000)

#### Example Bitmap (16x16):
```text
0000000000000000-0000000000000000-0000000000000000-0000000222200000-0000002222220000-0000002277770000-0000222277770000-0000222222220000-0000222222220000-0000222222220000-0000222222220000-0000002200220000-0000002200220000-0000000000000000-0000000000000000-0000000000000000
```

### Response Headers
- `Content-Type`: `image/png`

### Error Responses
- `400 Bad Request`: Returned if the `bitmap` parameter is  invalid.
  - Example: `Invalid bitmap. Must be 16 lines of 16 digits each.`
- `500 Internal Server Error`: Returned if there is an error generating the image.

## Deployment and Development
The API is deployed using Vercel. 


## Example Use Cases
1. **Generate Custom Graphics**: Use the API to create pixel-art designs for games or illustrations.
2. **Dynamic Visualizations**: Integrate the API into web applications to generate real-time visual data.
3. **Learning and Experimentation**: Use the API as a tool for learning bitmap-based image generation.

---

## Additional Notes
- Ensure the bitmap string is properly formatted to avoid errors.
- The canvas size is set to 640x640 pixels, and each pixel is dynamically scaled to fit the grid.
- This was mainly inspired by [bitmapgen](https://verumignis.com/bitmapgen/)

