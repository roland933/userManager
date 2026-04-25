export function getItemVariant(index:number,variant:string='muted') {
        
        return index % 2 == 0 ? variant: '';

}