
let count = 0;
export function Roundrobin() {
    count++;
    return count % 3;

}