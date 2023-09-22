export const Invoice ={
    id:10,
    name:'Componentes PC',
    client:{
        name:'Jhon',
        lastname:'Doe',
        adress:{
            country:'USA',
            city:'Los Angeles',
            street:'One street',
            number:12
        }
    },
    company:{
        name:'New Egg',
        fiscalNumber:123456
    },
    items:[
        {
            id:1,
            product:'CPU Intel i7',
            price:499,
            quantity:1
        },
        {
            id:2,
            product:'Corsair Kayboard Mecanico',
            price:150,
            quantity:1},
        {
            id:3,
            product:'Monitor Asus',
            price:350,
            quantity:1}
    ]
}