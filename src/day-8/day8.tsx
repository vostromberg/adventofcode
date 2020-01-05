import React from 'react';
import ReactDom from 'react-dom';
import { day8input } from './day8-input';
import { getLayers } from '../spaceImage/spaceImageDecoder';

export const day8part1 = async () => {
    const layers = getLayers(day8input, 25, 6);
    let layerWithFewestZeros = { index: -1, count: 26 };
    layers.forEach((layer, index) => {
        const zeros = layer.reduce((prev, curr) => {
            return prev + curr.filter(x => x === 0).length;
        }, 0)
        if (zeros < layerWithFewestZeros.count) {
            layerWithFewestZeros = { index, count: zeros };
        }
    });
    const counts = layers[layerWithFewestZeros.index].reduce((prev, curr) => {
        return {
            ones: prev.ones + curr.filter(x => x === 1).length,
            twos: prev.twos + curr.filter(x => x === 2).length
        }
    }, { ones: 0, twos: 0 });
    return counts.ones * counts.twos;
}

export const day8part2 = async () => {

    const layers = getLayers(day8input, 25, 6);
    const cnv: HTMLCanvasElement = document.createElement("canvas");
    const scaleFactor = 4;
    cnv.width = 25 * scaleFactor
    cnv.height = 6 * scaleFactor;
    const drawingContext = cnv.getContext("2d") as CanvasRenderingContext2D;
    for (var i = layers.length - 1; i >= 0; i--) {
        const currentLayer = layers[i];
        currentLayer.forEach((row, y) => {
            row.forEach((value, x) => {
                switch (value) {
                    case 0:
                        drawingContext.fillStyle = "#000000";
                        break;
                    case 1:
                        drawingContext.fillStyle = "#FFFFFF";
                        break;
                    default:
                        drawingContext.fillStyle = "transparent";
                        break;
                };
                drawingContext.fillRect(x * scaleFactor, y * scaleFactor, 1 * scaleFactor, 1 * scaleFactor);
            });
        })
    }

    return <img style={{ backgroundColor: "#000", padding:"10px" }} src={cnv.toDataURL()} />;
}