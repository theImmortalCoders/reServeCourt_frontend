export function translateCourtSurface(surface: string) {
  switch (surface) {
    case "CLAY":
      return "Ziemia";
    case "CONCRETE":
      return "Beton";
    case "GRASS":
      return "Trawa";
    case "ACRYLIC":
      return "Akryl";
    default:
      return "Niezdefiniowana";
  }
}

type CourtType = "INDOOR" | "OUTDOOR";
export function translateCourtType(type: string) {
  switch (type) {
    case "INDOOR":
      return "Wewnętrzny";
    case "OUTDOOR":
      return "Zewnętrzny";
    default:
      return "Niezdefiniowana";
  }
}
