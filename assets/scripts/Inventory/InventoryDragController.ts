import {
  _decorator,
  EventMouse,
  EventTouch,
  Node,
  UITransform,
  Vec3,
} from "cc";
import { Singleton } from "./Singleton";
import { Inventory } from "./Inventory";
const { ccclass, property } = _decorator;

@ccclass("InventoryDragController")
export class InventoryDragController extends Singleton<InventoryDragController> {
  @property(Node)
  private itemMove: Node = null;

  @property(Node)
  private parent: Node = null;

  @property(Node)
  private targetSlot: Node = null;

  public setItemMove(item: Node, event: EventTouch | EventMouse): void {
    if (this.itemMove) return;

    this.itemMove = item;
    this.parent = item.parent;
    this.itemMove.setParent(this.node.parent);
    this.setPosItemMove(event);
  }

  public resetItemMove(): void {
    if (!this.itemMove) return;

    this.itemMove.setPosition(new Vec3(0, 0, 0));

    if (!!this.targetSlot && this.targetSlot.children.length == 0) {
      this.targetSlot.addChild(this.itemMove);
    } else {
      this.itemMove.setParent(this.parent);
    }

    this.itemMove = null;
    this.targetSlot = null;
  }

  public moveItem(event: EventTouch | EventMouse): void {
    if (!this.itemMove) return;

    this.setPosItemMove(event);
  }

  private setPosItemMove(event: EventTouch | EventMouse): void {
    const posMouse = event.getUILocation();
    const posStart = this.node.parent
      .getComponent(UITransform)
      .convertToNodeSpaceAR(new Vec3(posMouse.x, posMouse.y, 0));
    this.itemMove.setPosition(posStart);
  }

  protected onLoad(): void {
    InventoryDragController.instance = this;
  }

  protected update(): void {
    if (!this.itemMove) return;

    Inventory.getInstance<Inventory>().slots.forEach((slot) => {
      const slotRect = slot.getWorldPosition();
      const itemRect = this.itemMove.getWorldPosition();

      if (Vec3.distance(slotRect, itemRect) < 50) {
        this.targetSlot = slot;
        return;
      }
    });
  }
}
