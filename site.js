//состояние приложения (данные)
let store = new Vuex.Store({
	state: {
		currentId: 0,
		entities: [],
		relationships: []
	},
	//геттера для получения данных
	getters: {
		ENTITIES: state => {
			return state.entities;
		}		  
	},
	//здесь происходят все изменения
	mutations: {
		ADD_ENTITY: (state, entity) => {
			entity["id"] = state.currentId;
			state.currentId++;
			state.entities.push(entity);
		},
		CHANGE_ENTITY_POSITION: (state, position) => {
			for (let i = 0; i < state.entities.length; ++i) {
				if (state.entities[i].id == position.id) {
					state.entities[i].x = position.x;
					state.entities[i].y = position.y;
                }
            }
        }
	},
	//методы, к которым мы можем обращаться
	actions: {
		ADD_ENTITY: (context, entity) => {
			context.commit("ADD_ENTITY", entity);
		},
		CHANGE_ENTITY_POSITION: (context, position) => {
			context.commit("CHANGE_ENTITY_POSITION", position);
        }
	},
});

//непосредственно вид приложения
let app = new Vue({
	el: '#app',
	store, //состояния vuex
    data: { //различные флажки и переменные для форм
		isAddEntityOpened: false,
		isAddRelationOpened: false,
		addEntityName: "",
		addEntityDefinition: "",
		movingEntity: null,
    },
	mounted: function () { //заполнение тестовыми данными
		this.$store.dispatch("ADD_ENTITY", { name: "Продукт", definition: "Описание продукта", x: 20, y: 30 });
		this.$store.dispatch("ADD_ENTITY", { name: "Брэнд", definition: "Описание брэнда", x: 340, y: 30 });
    },
    methods: { //методы для работы с панелями
		openAddEntity: function () {
			this.isAddEntityOpened = true;
			this.isAddRelationOpened = false;
		},
		openAddRelation: function () {
			this.isAddRelationOpened = true;
			this.isAddEntityOpened = false;
		},
		//метод добавления новой сущности
		submitAddEntity: function () {
			if (this.addEntityName == "" || this.addEntityDefinition == "") {
				alert("введите значение полей");
			}
			else {
				this.$store.dispatch("ADD_ENTITY", { name: this.addEntityName, definition: this.addEntityDefinition, x: 0, y: 0 });
				this.addEntityName = "";
				this.addEntityDefinition = "";
				this.isAddEntityOpened = false;
            }
		},
		//методы необходимые для перемещения сущностей по холсту
		startMoveEntity: function (e) {
			this.movingEntity = e;
		},
		moveEntity: function (event) {
			if (this.movingEntity != null) {
				let e = this.movingEntity;
				this.$store.dispatch("CHANGE_ENTITY_POSITION", { id: e.id, x: e.x + event.movementX, y: e.y + event.movementY });
            }
		},
		stopMoveEntity: function () {
			this.movingEntity = null;
		},
		stopMoveEntity: function () {
			this.movingEntity = null;
        }
	},
	//получение списка сущностей
    computed: {
		entities() {
			return this.$store.getters.ENTITIES;
		}
	}
});