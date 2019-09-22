json.(user, :id, :email, :first_name, :last_name)
json.set! :name, "#{user.first_name} #{user.last_name}"