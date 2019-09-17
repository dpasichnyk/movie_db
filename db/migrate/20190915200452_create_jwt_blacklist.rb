class CreateJwtBlacklist < ActiveRecord::Migration[6.0]
  def change
    create_table :jwt_blacklists do |t|
      t.string :jti, null: false, index: true
    end
  end
end
