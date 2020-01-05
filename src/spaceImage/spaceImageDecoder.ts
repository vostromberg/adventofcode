export const getLayers = (input: string, width: number, height: number) => {
    const layers: number[][][] = [];
    let currentLayer: number[][] = [];
    let currentRow: number[] = [];
    for (var i = 0; i < input.length; i++) {
        currentRow.push(parseInt(input[i]));
        if (currentRow.length == width) {
            currentLayer.push(currentRow);
            currentRow = [];
        }
        if (currentLayer.length == height) {
            layers.push(currentLayer);
            currentLayer = [];
        }
    }
    return layers;
}