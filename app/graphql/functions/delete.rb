module Functions
  class Delete < GraphQL::Function
    attr_reader :type

    def initialize(model)
      @model = model
      @type = Types.const_get("Types::#{model.name}Type")
    end

    argument :id, !types.ID

    def call(_obj, args, _ctx)
      @model.destroy(args[:id])
    end
  end
end
