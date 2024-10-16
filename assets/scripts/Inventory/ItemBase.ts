import {
  _decorator,
  CCFloat,
  CCInteger,
  CCString,
  Component,
  Label,
  Node,
  Sprite,
  SpriteFrame,
} from "cc";
import { InventoryDragController } from "./InventoryDragController";
const { ccclass, property } = _decorator;

@ccclass("Item")
export class Item {
  @property(CCInteger)
  id: number = 0;

  @property(CCString)
  name: string = "";

  @property(CCFloat)
  price: number = 0;

  @property(SpriteFrame)
  icon: SpriteFrame = null;
}

@ccclass("ItemBase")
export class ItemBase extends Component {
  @property(Sprite)
  icon: Sprite = null;

  @property(Label)
  nameItem: Label = null;

  @property(Label)
  price: Label = null;

  public init(item: Item): void {
    this.icon.spriteFrame = item.icon;
    this.nameItem.string = item.name;
    this.price.string = `${item.price.toLocaleString()}$`;
  }

  onTouchStart(event: any): void {
    InventoryDragController.getInstance<InventoryDragController>().setItemMove(
      this.node,
      event
    );
  }

  onTouchMove(event: any): void {
    InventoryDragController.getInstance<InventoryDragController>().moveItem(
      event
    );
  }

  onTouchEnd(): void {
    InventoryDragController.getInstance<InventoryDragController>().resetItemMove();
  }

  protected onLoad(): void {
    this.node.on(Node.EventType.TOUCH_START, this.onTouchStart, this);
    this.node.on(Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
    this.node.on(Node.EventType.TOUCH_END, this.onTouchEnd, this);

    this.node.on(Node.EventType.MOUSE_DOWN, this.onTouchStart, this);
    this.node.on(Node.EventType.MOUSE_MOVE, this.onTouchMove, this);
    this.node.on(Node.EventType.MOUSE_UP, this.onTouchEnd, this);
  }

  protected onDestroy(): void {
    this.node.off(Node.EventType.TOUCH_START, this.onTouchStart, this);
    this.node.off(Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
    this.node.off(Node.EventType.TOUCH_END, this.onTouchEnd, this);

    this.node.off(Node.EventType.MOUSE_DOWN, this.onTouchStart, this);
    this.node.off(Node.EventType.MOUSE_MOVE, this.onTouchMove, this);
    this.node.off(Node.EventType.MOUSE_UP, this.onTouchEnd, this);
  }
}
