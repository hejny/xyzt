

import { Transformation } from './Transformation';
import { Vector } from './Vector';

// TODO: to other my library - combine TC, Vire

export class BoundingBox {
    public static One() {
        return new BoundingBox();
    }

    public static fromMinMax(
        maxx: number,
        maxy: number,
        minx: number,
        miny: number,
        rotation: number,
    ) {
        return new BoundingBox(
            new Vector((maxx + minx) / 2, (maxy + miny) / 2),
            new Vector(maxx - minx, maxy - miny),
            rotation,
        );
    }

    constructor(
        public center: Vector = Vector.Zero(),
        public size: Vector = Vector.One(),
        public rotation: number = 0,
    ) {}

    public clone() {
        return new BoundingBox(this.center, this.size, this.rotation);
    }

    public cloneDeep() {
        return new BoundingBox(
            this.center.clone(),
            this.size.clone(),
            this.rotation,
        );
    }

    public applyTransformation(transformation: Transformation) {
        this.center.addInPlace(transformation.translate);
        this.size.scaleInPlace(transformation.scale);
        this.rotation += transformation.rotate;
    }

    public intersects(position: Vector): boolean {
        const position1r = this.center;
        const position2r = position.rotate(-this.rotation, this.center);

        return (
            position1r.x - this.size.x / 2 <= position2r.x &&
            position1r.y - this.size.y / 2 <= position2r.y &&
            position1r.x + this.size.x / 2 >= position2r.x &&
            position1r.y + this.size.y / 2 >= position2r.y
        );
    }

    public grow(amount: number) {
        return new BoundingBox(
            this.center,
            new Vector(this.size.x + amount * 2, this.size.y + amount * 2),
            this.rotation,
        );
    }

    public rotate(radians = 0, position = this.center) {
        this.center = this.center.rotate(radians, position); // TODO: maybe in place
        this.rotation += radians;
    }

    public isIn(outerBoard: BoundingBox) {
        return (
            outerBoard.intersects(this.topLeft) &&
            outerBoard.intersects(this.topRight) &&
            outerBoard.intersects(this.bottomLeft) &&
            outerBoard.intersects(this.bottomRight)
        );
    }

    public get topLeft() {
        return this.center
            .add(new Vector(this.size.x * -0.5, this.size.y * -0.5))
            .rotate(this.rotation, this.center);
    }

    public set topLeft(value: Vector) {
        this.center = this.center.add(value.subtract(this.topLeft));
    }

    public get topRight() {
        return this.center
            .add(new Vector(this.size.x * 0.5, this.size.y * -0.5))
            .rotate(this.rotation, this.center);
    }

    public get bottomLeft() {
        return this.center
            .add(new Vector(this.size.x * -0.5, this.size.y * 0.5))
            .rotate(this.rotation, this.center);
    }

    public get bottomRight() {
        return this.center
            .add(new Vector(this.size.x * 0.5, this.size.y * 0.5))
            .rotate(this.rotation, this.center);
    }

    public countTransformation(destinationBoundingBox: BoundingBox) {
        return new Transformation(
            destinationBoundingBox.center.subtract(this.center),
            destinationBoundingBox.rotation - this.rotation,
            undefined,
            destinationBoundingBox.size.x / destinationBoundingBox.size.x, // TODO: better
        );
    }

    public redrawToElement(boundingBoxElement: HTMLDivElement) {
        boundingBoxElement.style.display = 'block';
        boundingBoxElement.style.position = 'fixed';
        boundingBoxElement.style.zIndex = '9999';
        boundingBoxElement.style.border = '2px solid red';
        boundingBoxElement.style.left = this.center.x + 'px';
        boundingBoxElement.style.top = this.center.y + 'px';
        boundingBoxElement.style.width = this.size.x + 'px';
        boundingBoxElement.style.height = this.size.y + 'px';
        boundingBoxElement.style.transform = `translate(-50%, -50%) rotate(${(this
            .rotation /
            Math.PI) *
            180}deg)`;
    }

    /*
    todo
    collide(boundingBox2: BoundingBox):boolean{
    }*/
}
