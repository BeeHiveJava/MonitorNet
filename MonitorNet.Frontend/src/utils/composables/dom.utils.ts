export class DomUtils {
  public static addExternalScript(script: string, body?: string): HTMLScriptElement {
    const element = document.createElement("script")
    element.setAttribute("type", "text/javascript")
    element.setAttribute("src", script)
    element.innerHTML = body ?? ""
    return this.addElement(element)
  }

  public static addElement<T extends Element>(element: T): T {
    return document.body.appendChild(element)
  }

  public static removeElement<T extends Element>(element?: T): T | undefined {
    if (!element) {
      return undefined
    }

    return document.body.removeChild(element)
  }

  public static randomElementId(prefix?: string): string {
    const id = Math.ceil(Math.random() * 1000000)
    return (prefix ?? "") + id.toString()
  }
}
