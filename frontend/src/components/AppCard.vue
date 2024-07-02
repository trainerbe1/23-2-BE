    <template>
        <div class="card mb-3">
        <div class="row no-gutters align-items-center">
            <div class="col-md-3">
            <img :src="item.image" class="card-img" :alt="'Gambar ' + item.name">
            </div>
            <div class="col-md-7">
            <div class="card-body">
                <h5 class="card-title mb-1">{{ item.name }}</h5>
                <p class="card-text">{{ item.description }}</p>
            </div>
            </div>
            <div class="col-md-2 text-right">
            <div class="dropdown">
                <button class="btn btn-outline-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                ...
                </button>
                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                <a class="dropdown-item" href="#" @click="addMeal">Add Meal</a>
                <a class="dropdown-item" href="#" @click="deleteItem">Delete</a>
                </div>
            </div>
            </div>
        </div>
        </div>
    </template>
    
    <script>
    export default {
        props: {
        item: {
            type: Object,
            required: true
        },
        onAddMeal: {
            type: Function,
            required: true
        },
        onDelete: {
            type: Function,
            required: true
        }
        },
        methods: {
        addMeal() {
            this.onAddMeal(this.item);
        },
        deleteItem() {
            this.onDelete(this.item);
        }
        }
    }
    </script>
    
    <style scoped>
    .card-body {
        margin-left: 60px;
        padding-bottom: 130px;
    }
    .card-img {
        object-fit: cover;
        width: 200px;
        height: 200px;
    }
    .dropdown {
        margin-right: 30px;
        padding-bottom: 130px;
    }
    </style>
    