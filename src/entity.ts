
export abstract class Entity {
    private props: { name: string, type: string }[]
    constructor(props: { name: string, type: string }[]) {
        this.props = props
    }

    public getProps = (): { name: string, type: string }[] => {
        return this.props
    }

    public getProp = (key: string): { name: string, type: string } => {
        return this.props.find((m: { name: string, type: string }) => m.name === key) || { name: '', type: ''}
    }
}