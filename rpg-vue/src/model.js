function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

var itemCats = [ 'helmet', 'crown', 'armor', 'clothes', 'weapon', 'lighter', 'purse', 'potion', 'spell', 'food'];

var itemLimits = [
    {slot:'head', limit:1, types: [ 'helmet' , 'crown' ]},
    {slot:'body', limit:1, types: [ 'armor', 'clothes' ]},
    {slot:'hands', limit:2, types: [ 'weapon', 'lighter']},
    {slot:'belt', limit:3, types: [ 'weapon', 'purse']},
    {slot:'bag', limit:10, types: [ 'helmet', 'crown', 'clothes', 'lighter', 'potion', 'spell', 'food', 'purse' ]}
];


class Item {
    static counter = 0;
    constructor(name, type, price, effect) {
	Item.counter++;
	this.id = Item.counter
	this.name = name
	// test si le type donné en param est valide
	if(itemCats.includes(type)) {
		this.type = type
	}
	else {
		this.type = ''
	}
	if (price>=0) {
		this.price = price
	}
	else {
		this.price = 0
	}
	this.effect = effect
    }
    static fromJSON(obj) {
	let it = new Item(obj.name, obj.type, obj.price, obj.effect)
	it.id = obj.id
	return it
    }
}

var items = [
    new Item('conic helmet', 'helmet', 200, 'A+10'),
    new Item('great crown of apologia', 'crown', 200, 'A+20'),
    new Item('band of joy', 'crown', 100, 'L+10'),
    new Item('leather armor', 'armor', 100, 'A+10'),
    new Item('broigne', 'armor', 200, 'A+20'),
    new Item('hauberk', 'armor', 500, 'A+40'),
    new Item('plate armor', 'armor', 1000, 'A+60'),
    new Item('tuxedo', 'clothes', 600, 'L+1'),
    new Item('cursed swimsuit', 'clothes', 10, 'A-10'),
    new Item('unicorn cosplay', 'clothes', 200, 'L+10'),
    new Item('dagger', 'weapon', 100, 'S+5'),
    new Item('cursed dagger', 'weapon', 100, 'S-5'),
    new Item('short sword', 'weapon', 200, 'S+10'),
    new Item('cursed short sword', 'weapon', 200, 'S-10'),
    new Item('long sword', 'weapon', 300, 'S+20'),
    new Item('cursed long sword', 'weapon', 300, 'S-20'),
    new Item('axe', 'weapon', 100, 'S+10'),
    new Item('cursed axe', 'weapon', 100, 'S-10'),
    new Item('great axe', 'weapon', 200, 'S+20'),
    new Item('cursed great axe', 'weapon', 200, 'S-20'),
    new Item('torch', 'lighter', 2, ''),
    new Item('oil lamp', 'lighter', 10, ''),
    new Item('leather purse', 'purse', 10, ''),
    new Item('protection potion', 'potion', 100, 'a+10'),
    new Item('health potion', 'potion', 100, 'l+10'),
    new Item('strength potion', 'potion', 100, 's+10'),
    new Item('fireball', 'spell', 1000, ''),
    new Item('ice cone', 'spell', 1000, ''),
    new Item('total healing', 'spell', 1000, ''),
    new Item('invisibility', 'spell', 1000, ''),
    new Item('levitation', 'spell', 1000, ''),
    new Item('apple', 'food', 1, 'l+1'),
    new Item('chicken', 'food', 10, 'l+5'),
    new Item('beef', 'food', 15, 'l+10'),
    new Item('wine', 'food', 2, 'l+2')
];

class Shop {
    static counter = 0;
    constructor(name, itemCat) {
	Shop.counter++;
	this.id = Shop.counter;
	this.name = name;
	this.itemCat = [...itemCat];
	this.itemStock = [];
	this.itemOrder = [];
	this.fillStock();
	this.fillOrder();
    }
    fillStock() {
	let tab = []	
	// fill tab with items matching the store categories
	tab = items.filter(e => this.itemCat.includes(e.type))
	/* ALTERNATE POSSIBILITY with a forEach :
	   items.forEach(e => {
	   if (this.itemCat.includes(e.type)) tab.push(e)
	   });
	*/
	
	// pick 10 at random, may lead to several occurences of the same item
	for(let i=0;i<10;i++) {
		let idx = getRandomInt(tab.length)
		this.itemStock.push(tab[idx])
	}		    
    }
    fillOrder() {
	let tab = []
	// fill tab with items macthing the store cat + not in itemStock
	items.forEach(e => {
		if (this.itemCat.includes(e.type)) {
		// check if e is already in itemStock or not
		let isStock = false;
		for(let i=0;i<this.itemStock.length;i++) {
			if (this.itemStock[i].name === e.name) {
			isStock = true;
			break;
			}
		}
		if (!isStock) tab.push(e)
		}
	});
	// get 5 different items at random => need to remove chosen in tab
	for(let i=0;i<5;i++) {
		let idx = getRandomInt(tab.length)
		this.itemOrder.push(tab[idx])
		tab.splice(idx,1)
		// stop choosing if there are no more items
		if (tab.length === 0) break;
	}	
    }
    // estimate the rebuy price of an item
    // if wrong items type return -1
    estimate(item) {
	if (!this.itemCat.includes(item.type)) return -1
	// the discount on the rebuy price varies from 0 to 90% of original price
	// means that the rebuy price varies from 10 to 100% of the original
	let r = getRandomInt(91)
	return item.price * (10.0+r)/100.0
    }
    // buy an item from the current player
    buy(item) {
	this.itemStock.push(item)
    }
    // sell an item to the current player
    sell(id) {
	this.itemStock.splice(id,1)
    }
    // order an item
    order(id) {
	this.itemStock.push(this.itemOrder[id]);
    }

    static fromJSON(obj) {
	let s = new Shop(obj.name, obj.itemCat)
	s.id = obj.id
	return s;
    }
}

class Street {
   static counter = 0;
    constructor(name) {
	Street.counter++;
	this.id = Street.counter;
	this.name = name;
	this.shops = [];
    }
    addShop(shop) {
	this.shops.push(shop);
    }
    static fromJSON(obj) {
	let s = new Street(obj.name)
	s.id = obj.id
	obj.shops.forEach(shop => s.shops.push(Shop.fromJSON(shop)))
	return s;
    }    
}

class Town {
   static counter = 0;
    constructor(name) {
	Town.counter++;
	this.id = Town.counter;
	this.name = name;
	this.streets = [];
    }
    addStreet(street) {
	this.streets.push(street);
    }
    static fromJSON(obj) {
	let t = new Town(obj.name)
	t.id = obj.id
	obj.streets.forEach(street => t.streets.push(Street.fromJSON(street)))
	return t;
    }        
}

let cat1 = [ 'helmet', 'armor', 'weapon' ];
let cat2 = [ 'clothes', 'purse', 'food', 'lighter' ];
let cat3 = [ 'crown', 'spell', 'potion' ];


//Création des villes, des rues et des magasins
//Ville + Magasin
let greedIsland = new Town("Greed Island");
let magasin1 = new Shop("Masadora", cat1);
let magasin3 = new Shop("LoveLove", cat3);
let magasin4 = new Shop("Antokiba", cat2);
let magasin5 = new Shop("Bunzen", cat1);
let magasin6 = new Shop("Dorias",cat2);
let magasin7 = new Shop("Solfrabi",cat3);
let magasin8 = new Shop("Rubicuta",cat2);
let magasin9 = new Shop("Arbre de shin",cat3);
//Rue
let rue1 = new Street("Island Street");
let rue2 = new Street("Challenge Street");
let rue3 = new Street("Departure Street");

rue1.addShop(magasin1);
rue1.addShop(magasin3);

rue2.addShop(magasin4);
rue2.addShop(magasin5);
rue2.addShop(magasin6);

rue3.addShop(magasin7);
rue3.addShop(magasin8);
rue3.addShop(magasin9);

greedIsland.addStreet(rue1);
greedIsland.addStreet(rue2);
greedIsland.addStreet(rue3);

//Magasin
let yorkShin = new Town("York Shin");
let magasin10 = new Shop("Beach Takuru", cat1);
let magasin11 = new Shop("Bay Rock", cat1);
let magasin12 = new Shop("Kastour", cat2);

let magasin13 = new Shop("Kastour", cat3);
let magasin14 = new Shop("Ripa", cat2);
let magasin15 = new Shop("Tarsetol",cat2);

let magasin16 = new Shop("Southern Peace",cat3);
let magasin17 = new Shop("Bull Market",cat1);
let magasin18 = new Shop("Little market",cat3);

//Rue
let rue4 = new Street("Hotel Street");
let rue5 = new Street("Station Street");
let rue6 = new Street("Auction Street");

rue4.addShop(magasin10);
rue4.addShop(magasin11);
rue4.addShop(magasin12);

rue5.addShop(magasin13);
rue5.addShop(magasin14);
rue5.addShop(magasin15);

rue6.addShop(magasin16);
rue6.addShop(magasin17);
rue6.addShop(magasin18);

yorkShin.addStreet(rue4);
yorkShin.addStreet(rue5);
yorkShin.addStreet(rue6);

let zaban = new Town("Zaban");
let magasin19 = new Shop("Biska", cat1);
let magasin20 = new Shop("Numelles", cat1);


let magasin21 = new Shop("Zebiru", cat3);
let magasin22 = new Shop("Astuce Tower", cat2);


let magasin23 = new Shop("Nid des Escrocs",cat3);

//Rue
let rue7 = new Street("Souterrain Street");
let rue8 = new Street("Forest Street");
let rue9 = new Street("Marecages Street");

rue7.addShop(magasin19);
rue7.addShop(magasin20);

rue8.addShop(magasin21);
rue8.addShop(magasin22);

rue9.addShop(magasin23);


zaban.addStreet(rue7);
zaban.addStreet(rue8);
zaban.addStreet(rue9);

class Slot {

    constructor(id, name) {
	this.id = id
	this.name = name
	this.items = []
    }
    static fromJSON(obj) {
	let s = new Slot(obj.id, obj.name)
	obj.items.forEach(it => s.items.push(Item.fromJSON(it)))
	return s
    }
}

class Monstre {
	constructor(name) {
		this.name = name;
		this.vie = 12000;
		this.force = 100;
	}

	monstreMort(){
		this.etat = false;
	}

}

class Perso {

    static counter = 0;
    constructor(name, level) {
	Perso.counter++;
	this.id = Perso.counter;
	this.name = name;
	this.level = level;
	this.slots = [];
	this.slots.push(new Slot(1,'head'))
	this.slots.push(new Slot(2,'body'))
	this.slots.push(new Slot(3,'hands'))
	this.slots.push(new Slot(4,'belt'))
	this.slots.push(new Slot(5,'bag'))	
	this.boughtItems = []; // list of item bought but not yet assigned
	this.vitality = this.level*50
	this.life = this.vitality
	this.strength = this.level*20
	this.armor = 0
	this.gold = 450;
    }


    buy(item) {
	if (item.price > this.gold) return "not enough gold"
	this.boughtItems.push(item);
	this.gold -= item.price
	return ""
    }

    assign(boughtItemIndex, slotIndex) {
	let item = this.boughtItems[boughtItemIndex]
	// find which limits corresponds to the target slot
	let lim = itemLimits.find(e => e.slot === this.slots[slotIndex].name)
	// check if item number is already reached
	if (this.slots[slotIndex].items.length === lim.limit) return "slot "+this.slots[slotIndex].name+" is full"
	// check if item type is allowed
	if (!lim.types.includes(item.type)) return "wrong item type ["+item.type+"] for slot "+this.slots[slotIndex].name
	this.boughtItems.splice(boughtItemIndex,1);
	this.slots[slotIndex].items.push(item);
	//console.log(this.boughtItems)
	return ""
    }

	dassign(indexItemSlot, indexSlot){
		let item = this.slots[indexSlot].items.splice(indexItemSlot, 1);
		console.log(item);
		this.boughtItems.push(item[0]);
	}

    sell( slotIndex, itemIndex, price) {
	this.slots[slotIndex].items.splice(itemIndex,1)
	this.gold += price
    }

    static fromJSON(obj) {
	let p = new Perso(obj.name, obj.level)
	p.id = obj.id
	p.gold = obj.gold
	p.life = obj.life
	p.vitality = obj.vitality
	p.strength = obj.strength
	p.armor = obj.armor
	p.slots.splice(0)
	obj.slots.forEach(slot => p.slots.push(Slot.fromJSON(slot)) )
	p.boughtItems.splice(0)
	// POSSIBLE ALTERNATIVE: use map() instead of forEach to assign bouthItems
	p.boughtItems = obj.boughtItems.map(it => Item.fromJSON(it) )
	return p
    }
}

var monstres = [
	new Monstre("T-Rex")
];

var teams = [
    new Perso("Kururo",150), new Perso("Neon",100), new Perso("Killua",180),new Perso("Hisoka",155)
];

var towns = [
	greedIsland, zaban, yorkShin
];

export { towns, teams, monstres}
