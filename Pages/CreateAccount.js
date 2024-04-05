import React , {useState} from "react";
import { Text, View,TextInput,TouchableOpacity } from "react-native";
import { styles } from '../styles/createAccoutstyle.js';
import { MaterialIcons } from "@expo/vector-icons";


const CreateAccount = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
      };

    return(
        <View style={styles.container}>
            <Text style={styles.staysup}>RiseUp
                        <Text style={styles.dot}>.</Text> {/* Dot with different style */}
                        </Text>
            <Text style={styles.tagline}>Create your account</Text>
            <Text style={styles.tagline}>Enter your details to continue</Text>
            <View style={styles.inputContainer}>
        <Text style={styles.label}>Name:</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={text => setName(text)}
          placeholder="Enter your name"
          placeholderTextColor="#ffffff" // Change placeholder color here
        />
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={text => setEmail(text)}
          placeholder="Enter your email"
          keyboardType="email-address"
          placeholderTextColor="#ffffff" // Change placeholder color here
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password:</Text>
        <View style={styles.passwordInputContainer}>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={text => setPassword(text)}
            placeholder="Enter your password "
            secureTextEntry={!showPassword}
            placeholderTextColor="#ffffff" // Change placeholder color here
            
          />
          <TouchableOpacity onPress={toggleShowPassword} style={styles.showHideButton}>
            <MaterialIcons name={showPassword ? 'visibility-off' : 'visibility'} size={24} color="gray" />
          </TouchableOpacity>
        </View>
      </View>
        </View>
        </View>
    )
}

export default CreateAccount;
