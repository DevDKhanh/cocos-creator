import { _decorator, CCInteger, instantiate, Node, Prefab } from "cc";
import { ItemBase } from "./ItemBase";
import { ItemsManager } from "./ItemsManager";
import { Singleton } from "./Singleton";
const { ccclass, property } = _decorator;

@ccclass("Inventory")
export class Inventory extends Singleton<Inventory> {
  @property(Prefab)
  itemPrefab: Prefab = null;

  @property([Node])
  slots: Node[] = [];

  @property([CCInteger])
  listIds: number[] = [5, 3]; // List of item ids that the user has

  @property([Node])
  itemsInInventory: Node[] = [];

  init(): void {
    const items = ItemsManager.getInstance<ItemsManager>().getItemUserHas(
      this.listIds
    );

    items.forEach((item, index) => {
      const itemNode = instantiate(this.itemPrefab);

      itemNode.getComponent(ItemBase).init(item);

      this.slots[index].addChild(itemNode);
      this.itemsInInventory.push(itemNode);
    });
  }

  public sortInventory(): void {
    this.itemsInInventory.forEach((item, index) => {
      item.setParent(this.slots[index]);
    });
  }

  protected start(): void {
    this.slots = this.node.children;
    this.init();

    Inventory.instance = this;
  }
}
