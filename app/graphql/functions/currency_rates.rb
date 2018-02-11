require 'httparty'

module Functions
  class CurrencyRates < GraphQL::Function
    attr_reader :type

    def initialize
      @type = GraphQL::ObjectType.define do
        name 'CurrencyRates'

        field :base, types.String
        field :date, Types::DateType, resolve: ->(obj, _args, _ctx) { Date.iso8601(obj['date']) }
        field :rates, Types::JSONType
      end
    end

    argument :date, Types::DateType
    argument :base, types.String, default_value: 'EUR'

    def call(_obj, args, _ctx)
      params = "#{args['date'] || 'latest'}?base=#{args['base']}"
      response = HTTParty.get("http://api.fixer.io/#{params}", timeout: 10)
      OpenStruct.new(response.parsed_response)
    end
  end
end
