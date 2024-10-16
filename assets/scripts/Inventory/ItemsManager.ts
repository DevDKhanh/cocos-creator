import { _decorator, Component, Node } from "cc";
import { Item } from "./ItemBase";
import { Singleton } from "./Singleton";
const { ccclass, property } = _decorator;

@ccclass("ItemsManager")
export class ItemsManager extends Singleton<ItemsManager> {
  @property([Item])
  items: Item[] = [];

  get itemCount(): number {
    return this.items.length;
  }

  get itemList(): Item[] {
    return this.items;
  }

  public getItemUserHas(ids: number[]): Item[] {
    return this.items.filter((item) => ids.find((id) => id === item.id));
  }

  public getItemById(id: number): Item {
    return this.items.find((item) => item.id === id);
  }

  protected onLoad(): void {
    ItemsManager.instance = this;
  }
}
