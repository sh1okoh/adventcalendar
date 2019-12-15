class TodosController < ApplicationController
  before_action :set_todo, only: [:show, :edit, :update, :destroy]

  # GET /todos
  def index
    @todos = Todo.all
    render json: @todos
  end

  # GET /todos/1
  def show
    render json: @todo
  end

  # GET /todos/new
  def new
    @todo = Todo.new
  end

  # GET /todos/1/edit
  def edit
  end

  # POST /todos
  def create
    @todo = Todo.new(create_params)
    if @todo.save
      render json: @todo
    else
      render :new
    end
  end

  # PATCH/PUT /todos/1
  def update
    if @todo.update!(update_params)
      render json: @todo
    else
      render :edit
    end
  end

  # DELETE /todos/1
  def destroy
    @todo.destroy
    render json: @todos
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_todo
      @todo = Todo.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def create_params
      params.require(:todo).permit(:contents)
    end

    def update_params
      params.require(:todo).permit(%i[id contents])
    end

    def destroy_params
      params.require(:todo).permit(:id)
    end
end
